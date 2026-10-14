import type { Box, ImageInput, PaddleOcrService, RecognitionResult } from "paddleocr";

const VIN_REGEX = /^[A-HJ-NPR-Z0-9]{17}$/;
const CHASSIS_LABEL = /(?:N(?:UMERO|[0O])?(?:DU|DE)?CHASSIS|CHASSIS)/;
const VIN_CHARACTERS = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789".split("");
const MODEL_BASE_URL =
  "https://huggingface.co/PaddlePaddle/PP-OCRv6_small_det_onnx/resolve/28fe5895c24fd108c19eb3e8479f4ab385fbfc62/inference.onnx";
const RECOGNITION_MODEL_URL =
  "https://huggingface.co/PaddlePaddle/PP-OCRv6_small_rec_onnx/resolve/b8f84f0b80c529de40b4fbb3544b84fa7233a513/inference.onnx";
const DICTIONARY_URL =
  "https://huggingface.co/x3zvawq/paddleocr-js-onnx/resolve/51c2133b5a7ea27b795fa8c400fdbfbd5337dd6a/ppocr_v6_small/ppocrv6_dict.txt";

interface TextLine {
  results: RecognitionResult[];
  box: Box;
  text: string;
}

let ocrPromise: Promise<PaddleOcrService> | null = null;

function cleanText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

function normalizeVin(value: string) {
  return value
    .replace(/[^A-Z0-9]/g, "")
    .replace(/O/g, "0")
    .replace(/Q/g, "0")
    .replace(/I/g, "1");
}

function findVin(text: string): string | null {
  const chunks = cleanText(text).match(/[A-Z0-9]+/g) ?? [];

  for (let start = 0; start < chunks.length; start += 1) {
    let candidate = "";
    for (let end = start; end < Math.min(start + 8, chunks.length); end += 1) {
      candidate += normalizeVin(chunks[end]);
      if (
        candidate.length === 17 &&
        VIN_REGEX.test(candidate) &&
        (candidate.match(/\d/g)?.length ?? 0) >= 4
      ) {
        return candidate;
      }
      if (candidate.length >= 17) break;
    }
  }
  return null;
}

async function fetchAsset(url: string, description: string): Promise<ArrayBuffer> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Impossible de télécharger ${description} (${response.status}).`);
  }
  return response.arrayBuffer();
}

function getOcrService(): Promise<PaddleOcrService> {
  if (!ocrPromise) {
    ocrPromise = (async () => {
      const [paddle, ort, detectionModel, recognitionModel, dictionaryText] = await Promise.all([
        import("paddleocr"),
        import("onnxruntime-web/wasm"),
        fetchAsset(MODEL_BASE_URL, "le modèle de détection PaddleOCR"),
        fetchAsset(RECOGNITION_MODEL_URL, "le modèle de reconnaissance PaddleOCR"),
        fetch(DICTIONARY_URL).then((response) => {
          if (!response.ok) {
            throw new Error(`Impossible de télécharger le dictionnaire PaddleOCR (${response.status}).`);
          }
          return response.text();
        }),
      ]);

      const dictionary = [...dictionaryText.trimEnd().split(/\r?\n/), " "];
      return paddle.PaddleOcrService.createInstance({
        ort,
        modelPreset: "PP-OCRv6_small",
        detection: { modelBuffer: detectionModel },
        recognition: {
          modelBuffer: recognitionModel,
          charactersDictionary: dictionary,
        },
      });
    })().catch((error: unknown) => {
      ocrPromise = null;
      throw error;
    });
  }

  return ocrPromise;
}

function toImageInput(image: ImageBitmap): ImageInput {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Impossible de préparer l’image pour PaddleOCR.");

  context.drawImage(image, 0, 0);
  const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
  return { width: canvas.width, height: canvas.height, data };
}

function groupTextLines(results: RecognitionResult[]): TextLine[] {
  const sorted = [...results].sort(
    (a, b) => a.box.y + a.box.height / 2 - (b.box.y + b.box.height / 2),
  );
  const lines: TextLine[] = [];

  for (const result of sorted) {
    const centerY = result.box.y + result.box.height / 2;
    const line = lines.find((candidate) => {
      const candidateCenterY = candidate.box.y + candidate.box.height / 2;
      return Math.abs(centerY - candidateCenterY) <=
        Math.max(4, Math.min(result.box.height, candidate.box.height) * 0.35);
    });

    if (line) {
      line.results.push(result);
      line.box = {
        x: Math.min(line.box.x, result.box.x),
        y: Math.min(line.box.y, result.box.y),
        width: Math.max(line.box.x + line.box.width, result.box.x + result.box.width) -
          Math.min(line.box.x, result.box.x),
        height: Math.max(line.box.y + line.box.height, result.box.y + result.box.height) -
          Math.min(line.box.y, result.box.y),
      };
    } else {
      lines.push({ results: [result], box: { ...result.box }, text: "" });
    }
  }

  for (const line of lines) {
    line.results.sort((a, b) => a.box.x - b.box.x);
    line.text = line.results.map((result) => result.text).join(" ");
  }
  return lines;
}

function isChassisLabel(text: string) {
  return CHASSIS_LABEL.test(cleanText(text).replace(/[^A-Z0-9]/g, ""));
}

async function createScanImage(file: File): Promise<Blob> {
  if (typeof createImageBitmap !== "function") return file;

  const image = await createImageBitmap(file);
  try {
    const rotate = image.height > image.width;
    const orientedWidth = rotate ? image.height : image.width;
    const orientedHeight = rotate ? image.width : image.height;
    const scale = Math.min(1, 1800 / Math.max(orientedWidth, orientedHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(orientedWidth * scale));
    canvas.height = Math.max(1, Math.round(orientedHeight * scale));

    const context = canvas.getContext("2d");
    if (!context) throw new Error("Impossible de préparer l’image pour la lecture.");
    if (rotate) {
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate(Math.PI / 2);
      context.drawImage(image, -canvas.height / 2, -canvas.width / 2, canvas.height, canvas.width);
    } else {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    }

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => result ? resolve(result) : reject(new Error("Impossible de traiter l’image.")),
        "image/jpeg",
        0.92,
      );
    });
  } finally {
    image.close();
  }
}

async function cropChassisRow(imageBlob: Blob, box: Box): Promise<Blob> {
  const image = await createImageBitmap(imageBlob);
  try {
    const padding = Math.max(4, box.height * 0.25);
    const top = Math.max(0, Math.floor(box.y - padding));
    const bottom = Math.min(image.height, Math.ceil(box.y + box.height + padding));
    const left = Math.min(image.width - 1, Math.max(0, Math.floor(box.x - padding)));
    const width = image.width - left;
    const height = bottom - top;
    const scale = Math.min(2, 2600 / Math.max(width, height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(width * scale));
    canvas.height = Math.max(1, Math.round(height * scale));

    const context = canvas.getContext("2d");
    if (!context) throw new Error("Impossible de préparer la ligne du N° du châssis.");
    context.drawImage(image, left, top, width, height, 0, 0, canvas.width, canvas.height);

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => result ? resolve(result) : reject(new Error("Impossible de recadrer la ligne du châssis.")),
        "image/jpeg",
        0.98,
      );
    });
  } finally {
    image.close();
  }
}

async function recognizeImage(ocr: PaddleOcrService, imageBlob: Blob) {
  const image = await createImageBitmap(imageBlob);
  try {
    const results = await ocr.recognize(toImageInput(image));
    return groupTextLines(results);
  } finally {
    image.close();
  }
}

export async function scanVin(file: File): Promise<string | null> {
  const image = await createScanImage(file);
  const ocr = await getOcrService();

  const lines = await recognizeImage(ocr, image);
  const chassisLine = lines.find((line) => isChassisLabel(line.text));
  if (!chassisLine) return null;

  const vin = findVin(chassisLine.text);
  if (vin) return vin;

  const rowCrop = await cropChassisRow(image, chassisLine.box);
  const rowLines = await recognizeImageWithVinWhitelist(ocr, rowCrop);
  return rowLines.map((line) => findVin(line.text)).find((candidate) => candidate !== null) ?? null;
}

async function recognizeImageWithVinWhitelist(ocr: PaddleOcrService, imageBlob: Blob) {
  const image = await createImageBitmap(imageBlob);
  try {
    const results = await ocr.recognize(toImageInput(image), { charWhiteList: VIN_CHARACTERS });
    return groupTextLines(results);
  } finally {
    image.close();
  }
}

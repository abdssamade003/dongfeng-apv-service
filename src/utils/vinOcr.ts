import { createWorker } from "tesseract.js";

const VIN_REGEX = /^[A-HJ-NPR-Z0-9]{17}$/;
const CHASSIS_LABEL = /(?:N(?:UMERO|O)?(?:DU|DE)?CHASSIS|CHASSIS|VIN)/;

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
      if (candidate.length === 17 && VIN_REGEX.test(candidate)) return candidate;
      if (candidate.length >= 17) break;
    }
  }
  return null;
}

function extractChassisVin(text: string): string | null {
  const lines = cleanText(text).split(/\r?\n/);

  for (const line of lines) {
    const normalizedLine = line.replace(/[^A-Z0-9]/g, "");
    const label = CHASSIS_LABEL.exec(normalizedLine);
    if (!label) continue;

    // The chassis number is paired with its label on the same registration row.
    const vin = findVin(line);
    if (vin) return vin;
  }

  return null;
}

async function createRotatedImages(file: File): Promise<Blob[]> {
  if (typeof createImageBitmap !== "function") return [file];

  const image = await createImageBitmap(file);
  try {
    const rotatedImages: Blob[] = [file];
    for (const angle of [90, 180, 270]) {
      const quarterTurn = angle === 90 || angle === 270;
      const canvas = document.createElement("canvas");
      canvas.width = quarterTurn ? image.height : image.width;
      canvas.height = quarterTurn ? image.width : image.height;

      const context = canvas.getContext("2d");
      if (!context) throw new Error("Impossible de préparer l’image pour la lecture.");

      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate((angle * Math.PI) / 180);
      context.drawImage(image, -image.width / 2, -image.height / 2);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (result) => result ? resolve(result) : reject(new Error("Impossible de traiter l’image.")),
          "image/jpeg",
          0.95,
        );
      });
      rotatedImages.push(blob);
    }
    return rotatedImages;
  } finally {
    image.close();
  }
}

export async function scanVin(file: File): Promise<string | null> {
  const images = await createRotatedImages(file);
  const worker = await createWorker("eng");

  try {
    for (const image of images) {
      const { data: { text } } = await worker.recognize(image);
      const vin = extractChassisVin(text);
      if (vin) return vin;
    }
    return null;
  } finally {
    await worker.terminate();
  }
}

import type { City, CityAvailability } from "../types";

const sheetId = "1bjETFs_P5bbuUbW_G_D-zyHKH7HnnfU0_D4Ent2oCc0";
const stockUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=1324738184`;

export const stockCities: City[] = [
  { id: "SPDF", name: "Casa VUL", agency: "Casa VUL" },
  { id: "SPDFAG", name: "Agadir", agency: "Agadir" },
  { id: "SPDFAS", name: "Casa VP", agency: "Casa VP" },
  { id: "SPDFMK", name: "Marrakech", agency: "Marrakech" },
  { id: "SPDFTG", name: "Tanger", agency: "Tanger" },
  { id: "CWSPDF", name: "Magasin Central", agency: "Magasin Central" },
];

const locationNames = Object.fromEntries(stockCities.map((city) => [city.id, city.name]));

type CsvRow = Record<string, string>;

export interface PartsData {
  cities: City[];
  availability: Record<string, Record<string, CityAvailability>>;
}

function parseCsv(csv: string): CsvRow[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i];
    if (quoted) {
      if (char === '"' && csv[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"' && field.length === 0) {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && csv[i + 1] === "\n") i += 1;
      row.push(field);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (field || row.length) {
    row.push(field);
    if (row.some((value) => value.trim())) rows.push(row);
  }

  const headers = rows.shift()?.map((header) => header.replace(/^\uFEFF/, "").trim()) ?? [];
  if (!headers.length) throw new Error("Le fichier CSV reçu est vide.");

  return rows.map((values) =>
    Object.fromEntries(headers.map((header, index) => [header, (values[index] ?? "").trim()])),
  );
}

export function normalizeItemCode(value: unknown): string {
  return String(value ?? "").trim().toUpperCase();
}

function parseQuantity(raw: string): number {
  const parts = raw.replace(/\s/g, "").split(",");
  const value = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join("")}` : parts.join(".");
  const quantity = Number(value);
  if (!Number.isFinite(quantity)) throw new Error(`Quantité de stock invalide : "${raw}".`);
  return quantity;
}

async function fetchCsv(url: string, label: string): Promise<CsvRow[]> {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`${label} : réponse HTTP ${response.status}.`);
  return parseCsv(await response.text());
}

export async function loadPartsData(): Promise<PartsData> {
  const stockRows = await fetchCsv(stockUrl, "Base de stock");

  const inventory = new Map<string, Map<string, number>>();
  const inventoryUnits = new Map<string, Map<string, string>>();
  for (const row of stockRows) {
    const location = row.LOCN_CODE?.trim().toUpperCase();
    const itemCode = normalizeItemCode(row.ITEM_CODE);
    const rawQuantity = row.CURRENT_STOCK_TOTAL?.trim();
    if (!location || !itemCode || !rawQuantity || itemCode === "ITEM_CODE") continue;
    if (!locationNames[location]) continue;

    const quantity = parseQuantity(rawQuantity);
    const locationStock = inventory.get(location) ?? new Map<string, number>();
    locationStock.set(itemCode, (locationStock.get(itemCode) ?? 0) + quantity);
    const locationUnits = inventoryUnits.get(location) ?? new Map<string, string>();
    const unit = row.UOM_CODE?.trim();
    if (unit) locationUnits.set(itemCode, unit);
    inventory.set(location, locationStock);
    inventoryUnits.set(location, locationUnits);
  }

  const cities = stockCities;
  const availability: PartsData["availability"] = {};
  const itemCodes = new Set([...inventory.values()].flatMap((byCode) => [...byCode.keys()]));
  for (const itemCode of itemCodes) {
    if (availability[itemCode]) continue;
    const productAvailability: Record<string, CityAvailability> = {};
    for (const city of cities) {
      const locationStock = inventory.get(city.id);
      const qty = Math.max(0, locationStock?.get(itemCode) ?? 0);
      productAvailability[city.id] = {
        qty,
        unit: inventoryUnits.get(city.id)?.get(itemCode),
        status: qty > 1 ? "available" : "out",
      };
    }
    availability[itemCode] = productAvailability;
  }

  return { cities, availability };
}

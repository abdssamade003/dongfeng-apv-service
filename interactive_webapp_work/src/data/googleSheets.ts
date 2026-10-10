import type { City, CityAvailability, Product } from "../types";
import { categories } from "./mockData";

const sheetId = "1bjETFs_P5bbuUbW_G_D-zyHKH7HnnfU0_D4Ent2oCc0";
const applicabilityUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=1018299225`;
const stockUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=1324738184`;

const locationNames: Record<string, string> = {
  SPDF: "Casa VUL",
  SPDFAG: "Agadir",
  SPDFAS: "Casa VP",
  SPDFMK: "Marrakech",
  SPDFTG: "Tanger",
  CWSPDF: "Magasin Central",
};

const modelAliases: Record<string, string> = {
  BOX: "box",
  "BOX EV": "box",
  SHINE: "shine",
  "SHINE 1 5": "shine",
  "SHINE MAX": "shine-max",
  "SHINE MAX HE": "shine-max",
  MAGE: "mage",
  "MAGE HEV": "mage",
  HUGE: "huge",
  "HUGE HEV": "huge",
  "CAPTAIN W": "captain-w",
  "CAPTAIN 3400": "captain-3400",
  "CAPTAIN 3500": "captain-3500",
  "CAPTAIN 3500 A": "captain-3500",
  "CAPTAIN 3500A": "captain-3500",
  "CAPTAIN 3500L": "captain-3500",
  "CAPTAIN 7500": "captain-7500",
  BUS: "bus",
  "BUS DF": "bus",
  "U VAN": "uvan",
  GX: "gx",
  KC: "kc",
};

type CsvRow = Record<string, string>;

export interface PartsData {
  products: Product[];
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

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, " ")
    .trim();
}

function normalizeRef(value: string): string {
  return value.trim().toUpperCase();
}

function vehicleId(value: string): string | undefined {
  const normalized = normalize(value);
  const exactMatch = modelAliases[normalized];
  if (exactMatch) return exactMatch;
  if (normalized.startsWith("CAPTAIN 3400 ")) return "captain-3400";
  if (normalized.startsWith("CAPTAIN 3500 ")) return "captain-3500";
  return undefined;
}

function inferCategory(name: string): string {
  const normalized = normalize(name);
  const rules: [string, RegExp][] = [
    ["freinage", /\b(FREIN|FREINAGE|PLAQUETTE|DISQUE DE FREIN|BRAKE)\b/],
    ["filtration", /\b(FILTRE|FILTRATION|FILTER|ELEMENT FILTRANT)\b/],
    ["batterie", /\b(BATTERIE|BATTERY|ACCUMULATEUR)\b/],
    ["suspension", /\b(AMORTISSEUR|SUSPENSION|ROTULE|RESSORT|SHOCK ABSORBER)\b/],
    ["climatisation", /\b(CLIM|CLIMATISATION|COMPRESSEUR|EVAPORATEUR|CONDENSEUR|AIR CONDITION)\b/],
    ["eclairage", /\b(PHARE|OPTIQUE|AMPOULE|FEU |FEU$|ECLAIRAGE|HEADLAMP|HEADLIGHT|LAMP)\b/],
    ["carrosserie", /\b(CARROSSERIE|PARE CHOCS|PARE BRISE|PAREBRISE|RETROVISEUR|VITRE|GLACE|PORTE|AILE|BUMPER|MIRROR|WINDSCREEN)\b/],
    ["moteur", /\b(MOTEUR|PISTON|BIELLE|VILEBREQUIN|CULASSE|TURBO|SOUPAPE|DISTRIBUTION|INJECTEUR|INJECTION|POMPE A HUILE|ENGINE)\b/],
  ];
  return rules.find(([, pattern]) => pattern.test(normalized))?.[0] ?? "autres";
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
  const [fitmentRows, stockRows] = await Promise.all([
    fetchCsv(applicabilityUrl, "Base des références"),
    fetchCsv(stockUrl, "Base de stock"),
  ]);

  const productMap = new Map<string, Product>();
  for (const row of fitmentRows) {
    const ref = row.REF?.trim();
    if (!ref || normalize(ref) === "REF") continue;
    const productId = normalizeRef(ref);

    const product = productMap.get(productId) ?? {
      id: productId,
      name: row.ITEM_NAME?.trim() || ref,
      ref,
      inventoryRefs: [],
      applicableVehicleIds: [],
      categoryId: inferCategory(row.ITEM_NAME ?? ""),
      tags: [],
      position: "",
      note: "",
    };
    if (product.name === ref && row.ITEM_NAME?.trim()) product.name = row.ITEM_NAME.trim();
    const inventoryRefs = [ref, row["REF REMP"], row["REMP 2"], row.REMP2]
      .map((value) => value?.trim())
      .filter((value): value is string => !!value)
      .map(normalizeRef);
    product.inventoryRefs = [...new Set([...(product.inventoryRefs ?? []), ...inventoryRefs])];

    for (let index = 1; index <= 6; index += 1) {
      const id = vehicleId(row[`APP${index}`] ?? "");
      if (id && !product.applicableVehicleIds?.includes(id)) product.applicableVehicleIds?.push(id);
    }
    productMap.set(productId, product);
  }

  const inventory = new Map<string, Map<string, number>>();
  const inventoryUnits = new Map<string, Map<string, string>>();
  const locationCodes = new Set(Object.keys(locationNames));
  for (const row of stockRows) {
    const location = row.LOCN_CODE?.trim().toUpperCase();
    const item = row.ITEM?.trim();
    const rawQuantity = row.CURRENT_STOCK_TOTAL?.trim();
    if (!location || !item || !rawQuantity || normalize(location) === "LOCN CODE") continue;
    if (!locationNames[location]) continue;

    const quantity = parseQuantity(rawQuantity);
    const itemKey = normalizeRef(item);
    const locationStock = inventory.get(location) ?? new Map<string, number>();
    locationStock.set(itemKey, (locationStock.get(itemKey) ?? 0) + quantity);
    const locationUnits = inventoryUnits.get(location) ?? new Map<string, string>();
    const unit = row.UOM_CODE?.trim();
    if (unit) locationUnits.set(itemKey, unit);
    const itemCode = row.ITEM_CODE?.trim();
    const itemCodeKey = itemCode ? normalizeRef(itemCode) : "";
    if (itemCodeKey && itemCodeKey !== itemKey) {
      locationStock.set(itemCodeKey, (locationStock.get(itemCodeKey) ?? 0) + quantity);
      if (unit) locationUnits.set(itemCodeKey, unit);
    }
    inventory.set(location, locationStock);
    inventoryUnits.set(location, locationUnits);
  }

  const cities: City[] = [...locationCodes].map((code) => ({
    id: code,
    name: locationNames[code] ?? code,
    agency: locationNames[code] ?? code,
  }));

  const availability: PartsData["availability"] = {};
  const products = [...productMap.values()].filter((product) => product.applicableVehicleIds?.length);
  for (const product of products) {
    const productAvailability: Record<string, CityAvailability> = {};
    for (const city of cities) {
      const locationStock = inventory.get(city.id);
      const candidates = (product.inventoryRefs ?? []).map((ref) => ({
        qty: locationStock?.get(ref) ?? 0,
        unit: inventoryUnits.get(city.id)?.get(ref),
      }));
      const best = candidates.reduce<{ qty: number; unit?: string }>(
        (current, candidate) => candidate.qty > current.qty ? candidate : current,
        { qty: 0 },
      );
      const qty = Math.max(0, best.qty);
      productAvailability[city.id] = {
        qty,
        unit: best.unit,
        status: qty > 1 ? "available" : "out",
      };
    }
    availability[product.id] = productAvailability;
  }

  if (!products.length) throw new Error("Aucune référence avec compatibilité véhicule n’a été trouvée.");
  if (!cities.length) throw new Error("Aucun code agence n’a été trouvé dans la base de stock.");

  return { products, cities, availability };
}

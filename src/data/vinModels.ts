export type VinModelName =
  | "Captain W"
  | "Captain 3500"
  | "Captain 3500L"
  | "Captain C"
  | "Captain 3400"
  | "Captain T"
  | "Captain 7500"
  | "Captain D"
  | "BUS"
  | "MAGE"
  | "HUGE"
  | "SHINE"
  | "SHINE MAX"
  | "Fourgon"
  | "Ambulance"
  | "RICH 6 DC"
  | "RICH 6 SC"
  | "BOX";

interface VinModelFamily {
  family: string;
  models: VinModelName[];
  prefix: string;
  regex: RegExp;
  ambiguous?: boolean;
}

export const VIN_MODEL_FAMILIES: VinModelFamily[] = [
  {
    family: "Captain W",
    models: ["Captain W"],
    prefix: "LGDTE31C",
    regex: /^LGDTE31C[A-HJ-NPR-Z0-9]{9}$/i,
  },
  {
    family: "Captain 3500 Family",
    models: ["Captain 3500", "Captain 3500L", "Captain C"],
    prefix: "LGDTG81G",
    regex: /^LGDTG81G[A-HJ-NPR-Z0-9]{9}$/i,
    ambiguous: true,
  },
  {
    family: "Captain 3400 / T",
    models: ["Captain 3400", "Captain T"],
    prefix: "LGDTF81",
    regex: /^LGDTF81[A-HJ-NPR-Z0-9]{10}$/i,
    ambiguous: true,
  },
  {
    family: "Captain 7500",
    models: ["Captain 7500"],
    prefix: "CF1CRA1",
    regex: /^CF1CRA1[A-HJ-NPR-Z0-9]{10}$/i,
  },
  {
    family: "Captain D",
    models: ["Captain D"],
    prefix: "CF1XWB1",
    regex: /^CF1XWB1[A-HJ-NPR-Z0-9]{10}$/i,
  },
  {
    family: "BUS",
    models: ["BUS"],
    prefix: "CF1BAA4L2",
    regex: /^CF1BAA4L2[A-HJ-NPR-Z0-9]{8}$/i,
  },
  {
    family: "MAGE",
    models: ["MAGE"],
    prefix: "LDP35F90",
    regex: /^LDP35F90[A-HJ-NPR-Z0-9]{9}$/i,
  },
  {
    family: "HUGE",
    models: ["HUGE"],
    prefix: "LDP35G90",
    regex: /^LDP35G90[A-HJ-NPR-Z0-9]{9}$/i,
  },
  {
    family: "SHINE",
    models: ["SHINE"],
    prefix: "LGJE1EE0",
    regex: /^LGJE1EE0[A-HJ-NPR-Z0-9]{9}$/i,
  },
  {
    family: "SHINE MAX",
    models: ["SHINE MAX"],
    prefix: "LDP31G90",
    regex: /^LDP31G90[A-HJ-NPR-Z0-9]{9}$/i,
  },
  {
    family: "Fourgon / Ambulance",
    models: ["Fourgon", "Ambulance"],
    prefix: "LGFP7AJJ",
    regex: /^LGFP7AJJ[A-HJ-NPR-Z0-9]{9}$/i,
    ambiguous: true,
  },
  {
    family: "RICH 6",
    models: ["RICH 6 DC", "RICH 6 SC"],
    prefix: "LJNTGU53",
    regex: /^LJNTGU53[A-HJ-NPR-Z0-9]{9}$/i,
    ambiguous: true,
  },
  {
    family: "BOX",
    models: ["BOX"],
    prefix: "LDP43A96",
    regex: /^LDP43A96[A-HJ-NPR-Z0-9]{9}$/i,
  },
];

export const VIN_MASTER: Record<string, VinModelName> = {
  LGDTE31C6SA603024: "Captain W",
  LGDTG81G6PA104970: "Captain 3500L",
  LGDTG81GXMA900102: "Captain C",
  LGDTG81G9RA204886: "Captain 3500",
  LGDTF81D6SA002649: "Captain 3400",
  CF1CRA1L1NC000020: "Captain 7500",
  CF1BAA4L2PS000092: "BUS",
  LDP35F903SG386339: "MAGE",
  CF1XWB1U0SS000001: "Captain D",
};

export const VIN_MODEL_CATALOG_IDS: Partial<Record<VinModelName, string>> = {
  "Captain W": "captain-w",
  "Captain 3500": "captain-3500",
  "Captain 3500L": "captain-3500",
  "Captain C": "captain-3500",
  "Captain 3400": "captain-3400",
  "Captain T": "captain-3400",
  "Captain 7500": "captain-7500",
  BUS: "bus",
  MAGE: "mage",
  HUGE: "huge",
  SHINE: "shine",
  "SHINE MAX": "shine-max",
  BOX: "box",
};

export const VIN_PREFIX_RULES = VIN_MODEL_FAMILIES
  .filter((family) => !family.ambiguous && family.models.length === 1)
  .map(({ prefix, models }) => ({ prefix, model: models[0] }))
  .sort((a, b) => b.prefix.length - a.prefix.length);

const vehicleImage = (filename: string) => `/vehicles/${filename}.png`;

export const MODEL_IMAGES: Record<VinModelName, string | undefined> = {
  "Captain W": vehicleImage("captain-w"),
  "Captain 3500": vehicleImage("captain-3500"),
  "Captain 3500L": vehicleImage("captain-3500"),
  "Captain C": vehicleImage("captain-3500"),
  "Captain 3400": vehicleImage("captain-3400"),
  "Captain T": vehicleImage("captain-3400"),
  "Captain 7500": vehicleImage("captain-7500"),
  "Captain D": undefined,
  BUS: vehicleImage("bus"),
  MAGE: vehicleImage("mage"),
  HUGE: vehicleImage("huge"),
  SHINE: vehicleImage("shine"),
  "SHINE MAX": vehicleImage("shine-max"),
  Fourgon: undefined,
  Ambulance: undefined,
  "RICH 6 DC": undefined,
  "RICH 6 SC": undefined,
  BOX: vehicleImage("box"),
};

export const normalizeVin = (vin: string) => vin.replace(/\s/g, "").trim().toUpperCase().slice(0, 17);

export function detectVinModelPreview(vin: string): VinModelName | null {
  const normalizedVin = normalizeVin(vin);
  if (!normalizedVin) return null;

  const candidateModels = new Set(
    Object.entries(VIN_MASTER)
      .filter(([masterVin]) => masterVin.startsWith(normalizedVin))
      .map(([, model]) => model),
  );
  if (candidateModels.size === 1) return [...candidateModels][0];
  if (candidateModels.size > 1) return null;

  return VIN_PREFIX_RULES.find((rule) => normalizedVin.startsWith(rule.prefix))?.model ?? null;
}

export function detectVinModel(vin: string): VinModelName | null {
  const normalizedVin = normalizeVin(vin);
  if (normalizedVin.length !== 17) return null;

  const exactMatch = VIN_MASTER[normalizedVin];
  if (exactMatch) return exactMatch;

  const familyMatch = VIN_MODEL_FAMILIES.find((family) => family.regex.test(normalizedVin));
  if (!familyMatch || familyMatch.ambiguous || familyMatch.models.length !== 1) return null;

  return familyMatch.models[0];
}

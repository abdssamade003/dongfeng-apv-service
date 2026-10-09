import type { SelectedVehicle, VehicleModel } from "../types";

const YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019];
const vehicleImage = (filename: string) => `/vehicles/${filename}.png`;

const vehicleImages = {
  box: vehicleImage("box"),
  bus: vehicleImage("bus"),
  captain3400: vehicleImage("captain-3400"),
  captain3500: vehicleImage("captain-3500"),
  captain7500: vehicleImage("captain-7500"),
  captainW: vehicleImage("captain-w"),
  gx: vehicleImage("gx"),
  huge: vehicleImage("huge"),
  kc: vehicleImage("kc"),
  mage: vehicleImage("mage"),
  shine: vehicleImage("shine"),
  shineMax: vehicleImage("shine-max"),
  uvan: vehicleImage("uvan"),
};

export const vehicles: VehicleModel[] = [
  {
    id: "shine",
    name: "DONGFENG SHINE",
    years: YEARS,
    engines: ["1.5 Essence"],
    image: vehicleImages.shine,
  },
  {
    id: "shine-max",
    name: "DONGFENG SHINE MAX",
    years: YEARS.slice(0, 4),
    engines: ["Hybride HEV"],
    image: vehicleImages.shineMax,
  },
  {
    id: "box",
    name: "DONGFENG BOX",
    years: YEARS,
    engines: ["Électrique"],
    image: vehicleImages.box,
  },
  {
    id: "mage",
    name: "DONGFENG MAGE",
    years: YEARS,
    engines: ["Hybride HEV"],
    image: vehicleImages.mage,
  },
  {
    id: "huge",
    name: "DONGFENG HUGE",
    years: YEARS,
    engines: ["Hybride HEV"],
    image: vehicleImages.huge,
  },
  {
    id: "captain-w",
    name: "DONGFENG CAPTAIN W",
    years: YEARS,
    engines: ["Motorisation à confirmer"],
    image: vehicleImages.captainW,
  },
  {
    id: "captain-3400",
    name: "DONGFENG CAPTAIN 3400",
    years: YEARS,
    engines: ["Diesel"],
    image: vehicleImages.captain3400,
  },
  {
    id: "captain-3500",
    name: "DONGFENG CAPTAIN 3500",
    years: YEARS,
    engines: ["Diesel"],
    image: vehicleImages.captain3500,
  },
  {
    id: "captain-7500",
    name: "DONGFENG CAPTAIN 7500",
    years: YEARS,
    engines: ["Diesel"],
    image: vehicleImages.captain7500,
  },
  {
    id: "gx",
    name: "DONGFENG GX",
    years: YEARS,
    engines: ["Diesel ISZ520"],
    image: vehicleImages.gx,
  },
  {
    id: "kc",
    name: "DONGFENG KC",
    years: YEARS,
    engines: ["Diesel"],
    image: vehicleImages.kc,
  },
  {
    id: "uvan",
    name: "DONGFENG U-VAN",
    years: YEARS,
    engines: ["Diesel"],
    image: vehicleImages.uvan,
  },
  {
    id: "bus",
    name: "DONGFENG BUS",
    years: YEARS,
    engines: ["Diesel"],
    image: vehicleImages.bus,
  },
];

export const defaultVehicle: SelectedVehicle = {
  name: "DONGFENG SHINE",
  year: 2025,
  engine: "1.5 Essence",
  image: vehicleImages.shine,
};

export const contact = {
  name: "Service Pièces DONGFENG",
  phone: "+212 646139838",
  phoneHref: "tel:+212646139838",
  whatsappHref: "https://api.whatsapp.com/message/4GWVCNU3YEJUM1?autoload=1&app_absent=0",
  email: "a.sabir@dongfeng.ma",
};

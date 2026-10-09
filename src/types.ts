export type ScreenId = "home" | "vehicle" | "parts" | "product" | "contact";

export type StockStatus = "available" | "out" | "order";

export interface VehicleModel {
  id: string;
  name: string;
  years: number[];
  engines: string[];
  image: string;
}

export interface SelectedVehicle {
  name: string;
  year: number;
  engine: string;
  image: string;
  vin?: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  ref: string;
  itemCode?: string;
  subType?: string;
  categoryId: string;
  tags: string[];
  image?: string;
  position: string;
  note: string;
}

export interface City {
  id: string;
  name: string;
  agency: string;
  address?: string;
  hours?: string;
}

export interface CityAvailability {
  status: StockStatus;
  qty?: number;
  unit?: string;
  eta?: string;
}

import { Wrench, type LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  other: Wrench,
};

export function getCategoryIcon(key: string): LucideIcon {
  return icons[key] ?? Wrench;
}

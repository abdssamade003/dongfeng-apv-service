import {
  BatteryCharging,
  CarFront,
  Cog,
  Disc3,
  Funnel,
  Lightbulb,
  MoveVertical,
  Snowflake,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  brake: Disc3,
  filter: Funnel,
  battery: BatteryCharging,
  suspension: MoveVertical,
  snowflake: Snowflake,
  light: Lightbulb,
  body: CarFront,
  engine: Cog,
  other: Wrench,
};

export function getCategoryIcon(key: string): LucideIcon {
  return icons[key] ?? Wrench;
}

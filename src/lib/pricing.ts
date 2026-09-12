import { pricing } from "@/config/pricing";

export function minimumMonthlyPrice(locations: number): number {
  if (!Number.isInteger(locations) || locations < 1) throw new RangeError("locations must be a positive integer");
  return pricing.basePrice * locations;
}

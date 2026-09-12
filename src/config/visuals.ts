export const visualStories = [
  "/visuals/restaurant-shift.png",
  "/visuals/retail-checklist.png",
  "/visuals/cleaning-proof.png",
  "/visuals/hotel-handover.png",
  "/visuals/clinic-dashboard.png",
  "/visuals/factory-report.png",
] as const;

export const productVisuals: Record<string, string> = {
  "grafik-smen": visualStories[0],
  "chek-listy": visualStories[1],
  "foto-dokazatelstvo": visualStories[2],
  "uchet-vremeni": visualStories[3],
  dashboard: visualStories[4],
  otchety: visualStories[5],
};

export const industryVisuals: Record<string, string> = {
  restorany: visualStories[0],
  riteyl: visualStories[1],
  klining: visualStories[2],
  oteli: visualStories[3],
  kliniki: visualStories[4],
  proizvodstvo: visualStories[5],
  drugoe: visualStories[5],
};

export function visualByIndex(index: number) {
  return visualStories[index % visualStories.length];
}

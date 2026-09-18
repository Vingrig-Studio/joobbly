export type Goal =
  | "lead_form_open" | "demo_form_start"
  | "demo_form_submit_success" | "demo_form_submit_error" | "pricing_view"
  | "industry_select" | "faq_open"
  | "social_telegram_click" | "social_vk_click";

export function track(goal: Goal, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const id = Number(process.env.NEXT_PUBLIC_METRIKA_ID);
  const ym = (window as typeof window & { ym?: (id: number, action: string, goal: string, params?: object) => void }).ym;
  if (id && ym) ym(id, "reachGoal", goal, params);
}

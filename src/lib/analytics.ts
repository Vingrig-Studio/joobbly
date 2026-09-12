export type Goal =
  | "hero_start_free_click" | "hero_demo_click" | "header_start_free_click"
  | "download_page_open" | "download_app_store_click" | "download_google_play_click"
  | "download_apk_click" | "download_web_app_click" | "demo_form_start"
  | "demo_form_submit_success" | "demo_form_submit_error" | "pricing_view"
  | "pricing_cta_click" | "email_request_click" | "industry_select" | "industry_trial_click" | "faq_open"
  | "social_telegram_click" | "social_vk_click";

export function track(goal: Goal, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const id = Number(process.env.NEXT_PUBLIC_METRIKA_ID);
  const ym = (window as typeof window & { ym?: (id: number, action: string, goal: string, params?: object) => void }).ym;
  if (id && ym) ym(id, "reachGoal", goal, params);
}

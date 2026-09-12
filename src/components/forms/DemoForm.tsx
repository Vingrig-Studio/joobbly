"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { track } from "@/lib/analytics";
import { TrialButton } from "@/components/ui/TrialModalProvider";

export function DemoButton({ className = "button" }: { className?: string }) {
  return <Link href="/contacts/#demo" className={className} onClick={() => track("hero_demo_click")}>Получить демонстрацию</Link>;
}

type State = "idle" | "submitting" | "success" | "error" | "rate-limit";

export function DemoForm({ compact = false, available = true }: { compact?: boolean; available?: boolean }) {
  const [state, setState] = useState<State>("idle");
  const [started, setStarted] = useState(false);

  function start() {
    if (!started) { setStarted(true); track("demo_form_start"); }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setState("submitting");
    const data = Object.fromEntries(new FormData(form).entries());
    const params = new URLSearchParams(window.location.search);
    const utm = Object.fromEntries(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].flatMap((key) => params.get(key) ? [[key, params.get(key)!]] : []));
    try {
      const response = await fetch("/api/leads/", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...data, ...utm }) });
      if (response.status === 429) { setState("rate-limit"); track("demo_form_submit_error"); return; }
      if (!response.ok) throw new Error("Lead endpoint rejected request");
      setState("success");
      form.reset();
      track("demo_form_submit_success");
    } catch {
      setState("error");
      track("demo_form_submit_error");
    }
  }

  if (!available) return <div className="demo-form"><p className="eyebrow">Личная демонстрация</p><h3>Покажем Joobby на вашем примере</h3><p>Напишите, какой у вас бизнес и сколько точек. Команда ответит и согласует удобное время.</p><TrialButton source="email-request" mode="email" className="button">Запросить по электронной почте</TrialButton><a href="tel:+79219220890">Или позвоните: +7 921 922 0890</a></div>;
  if (state === "success") return <div className="form-success" role="status"><span>✓</span><h3>Заявка отправлена</h3><p>Свяжемся с вами в течение рабочего дня и договоримся о демонстрации.</p></div>;

  return <form className={`demo-form ${compact ? "compact" : ""}`} onSubmit={submit} onFocus={start} noValidate={false}>
    <div className="field-grid">
      <label><span>Имя</span><input name="name" autoComplete="name" placeholder="Как к вам обращаться" /></label>
      <label><span>Телефон или email *</span><input name="contact" required autoComplete="email" placeholder="+7 999 000-00-00" /></label>
      <label><span>Тип бизнеса *</span><input name="business" required placeholder="Например, сеть кофеен" /></label>
      <label><span>Количество точек *</span><select name="locations" required defaultValue=""><option value="" disabled>Выберите</option><option>1</option><option>2–5</option><option>6–10</option><option>11–30</option><option>Больше 30</option></select></label>
    </div>
    {!compact && <label><span>Сообщение</span><textarea name="message" rows={4} placeholder="Что хотите обсудить на демонстрации?" /></label>}
    <label className="consent"><input type="checkbox" name="consent" required /><span>Согласен на обработку персональных данных по <Link href="/privacy/" target="_blank">политике конфиденциальности</Link></span></label>
    <button className="button" type="submit" disabled={state === "submitting"}>{state === "submitting" ? "Отправляем…" : "Получить демонстрацию"}</button>
    {state === "error" && <p className="form-error" role="alert">Не получилось отправить. Проверьте соединение и попробуйте ещё раз или напишите на info@joobby.ru. Не закрывайте страницу, чтобы не потерять введённый текст.</p>}
    {state === "rate-limit" && <p className="form-error" role="alert">Слишком много попыток. Подождите немного и отправьте форму снова.</p>}
  </form>;
}

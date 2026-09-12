"use client";

import Link from "next/link";
import {
  createContext,
  FormEvent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { track } from "@/lib/analytics";
import styles from "./TrialModalProvider.module.css";

type SubmitState = "idle" | "submitting" | "success" | "error" | "rate-limit";
type TrialSource = "header" | "hero" | "mobile-menu" | "industry" | "pricing" | "email-request";
type TrialMode = "phone" | "email";

type TrialContextValue = {
  openTrial: (source: TrialSource, trigger: HTMLButtonElement, plan?: string, mode?: TrialMode) => void;
};

const TrialContext = createContext<TrialContextValue | null>(null);
const locationOptions = ["1", "2–5", "6–10", "10+"];

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  const national = (digits.startsWith("7") || digits.startsWith("8") ? digits.slice(1) : digits).slice(0, 10);
  if (!national) return "";
  let formatted = `+7 (${national.slice(0, 3)}`;
  if (national.length >= 3) formatted += ")";
  if (national.length > 3) formatted += ` ${national.slice(3, 6)}`;
  if (national.length > 6) formatted += `-${national.slice(6, 8)}`;
  if (national.length > 8) formatted += `-${national.slice(8, 10)}`;
  return formatted;
}

export function TrialModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [locations, setLocations] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [started, setStarted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [mode, setMode] = useState<TrialMode>("phone");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const closeModal = useCallback(() => setOpen(false), []);

  const openTrial = useCallback((source: TrialSource, trigger: HTMLButtonElement, plan?: string, nextMode: TrialMode = "phone") => {
    triggerRef.current = trigger;
    setState("idle");
    setSelectedPlan(plan ?? "");
    setMode(nextMode);
    setOpen(true);
    track(source === "hero" ? "hero_start_free_click" : source === "industry" ? "industry_trial_click" : source === "pricing" ? "pricing_cta_click" : source === "email-request" ? "email_request_click" : "header_start_free_click");
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    const focusFrame = requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [closeModal, open]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setState("submitting");
    const data = Object.fromEntries(new FormData(form).entries());
    const params = new URLSearchParams(window.location.search);
    const utm = Object.fromEntries(
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].flatMap((key) =>
        params.get(key) ? [[key, params.get(key)!]] : []
      )
    );

    try {
      const response = await fetch("/api/leads/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, ...utm }),
      });
      if (response.status === 429) {
        setState("rate-limit");
        track("demo_form_submit_error");
        return;
      }
      if (!response.ok) throw new Error("Lead endpoint rejected request");
      setState("success");
      setPhone("");
      setEmail("");
      setLocations("");
      track("demo_form_submit_success");
    } catch {
      setState("error");
      track("demo_form_submit_error");
    }
  }

  const contextValue = useMemo(() => ({ openTrial }), [openTrial]);

  return <TrialContext.Provider value={contextValue}>
    {children}
    {open && <div className={styles.backdrop} onMouseDown={(event) => {
      if (event.target === event.currentTarget) closeModal();
    }}>
      <div className={styles.dialog} ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="trial-title">
        <button className={styles.close} ref={closeRef} type="button" onClick={closeModal} aria-label="Закрыть форму">×</button>
        {state === "success" ? <div className={styles.success} role="status">
          <span aria-hidden="true">✓</span>
          <p>Заявка отправлена</p>
          <h2 id="trial-title">Скоро всё настроим</h2>
          <p>Свяжемся с вами в течение рабочего дня и поможем начать работу в Joobby.</p>
          <button type="button" onClick={closeModal}>Понятно</button>
        </div> : <>
          <div className={styles.heading}>
            <p>{mode === "email" ? "Запрос по электронной почте" : selectedPlan ? "Выбранный план" : "30 дней бесплатно"}</p>
            <h2 id="trial-title">{mode === "email" ? "Запросить Joobby" : "Попробовать Joobby"}</h2>
            <span>{mode === "email" ? "Оставьте email и количество точек — отправим условия подключения и поможем выбрать удобный старт." : selectedPlan ? `Вы выбрали «${selectedPlan}». Оставьте телефон — поможем подключить команду.` : "Оставьте телефон — поможем подключить команду и спокойно начать работу."}</span>
          </div>
          <form className={styles.form} onSubmit={submit} onFocus={() => {
            if (!started) {
              setStarted(true);
              track("demo_form_start");
            }
          }}>
            <input type="hidden" name="business" value={mode === "email" ? "Запрос условий по электронной почте" : selectedPlan ? `Выбранный план: ${selectedPlan}` : "Заявка на пробный период"} />
            <input type="hidden" name="locations" value={locations || "Не указано"} />
            <label className={styles.phoneField}>
              <span>{mode === "email" ? "Электронная почта" : "Телефон"}</span>
              {mode === "email" ? <input
                name="contact"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="name@company.ru"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              /> : <input
                name="contact"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={(event) => setPhone(formatPhone(event.target.value))}
                minLength={18}
                required
              />}
            </label>
            <fieldset className={styles.locationField}>
              <legend>Сколько у вас точек {mode === "phone" && <span>(необязательно)</span>}</legend>
              <div>{locationOptions.map((option) => <button
                key={option}
                className={locations === option ? styles.selected : ""}
                type="button"
                aria-pressed={locations === option}
                onClick={() => setLocations(locations === option ? "" : option)}
              >{option}</button>)}</div>
            </fieldset>
            <label className={styles.consent}>
              <input type="checkbox" name="consent" required />
              <span>Согласен на обработку персональных данных в соответствии с <Link href="/privacy/" target="_blank">политикой конфиденциальности</Link></span>
            </label>
            <button className={styles.submit} type="submit" disabled={state === "submitting"}>
              {state === "submitting" ? "Отправляем…" : mode === "email" ? "Запросить по электронной почте" : "Попробовать бесплатно"}
            </button>
            <p className={styles.note}>{mode === "email" ? "Ответим на почту в течение рабочего дня." : "Перезвоним в течение рабочего дня."}</p>
            {(state === "error" || state === "rate-limit") && <p className={styles.error} role="alert">
              {state === "rate-limit" ? "Слишком много попыток. Попробуйте ещё раз немного позже." : "Не получилось отправить заявку. Проверьте соединение или напишите на info@joobby.ru."}
            </p>}
          </form>
          <div className={styles.invited}>Вас уже пригласили в команду? <Link href="/download/" onClick={closeModal}>Скачайте приложение</Link></div>
        </>}
      </div>
    </div>}
  </TrialContext.Provider>;
}

export function TrialButton({
  children = "Попробовать",
  className = "button",
  inactive = false,
  onOpen,
  plan,
  mode = "phone",
  source,
}: {
  children?: ReactNode;
  className?: string;
  inactive?: boolean;
  onOpen?: () => void;
  plan?: string;
  mode?: TrialMode;
  source: TrialSource;
}) {
  const context = useContext(TrialContext);
  if (!context) throw new Error("TrialButton must be used inside TrialModalProvider");

  return <button
    className={className}
    type="button"
    aria-haspopup="dialog"
    aria-hidden={inactive || undefined}
    tabIndex={inactive ? -1 : undefined}
    onClick={(event) => {
      onOpen?.();
      context.openTrial(source, event.currentTarget, plan, mode);
    }}
  >{children}</button>;
}

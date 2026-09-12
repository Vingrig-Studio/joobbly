"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Metrika } from "@/components/analytics/Metrika";
import styles from "./CookieConsent.module.css";

type ConsentChoice = "accepted" | "essential";
type ConsentSnapshot = ConsentChoice | "undecided" | "loading";

const CONSENT_KEY = "joobby-cookie-consent-v1";
const CONSENT_EVENT = "joobby:cookie-consent-changed";

function readConsent(): ConsentSnapshot {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return "undecided";
    if (raw === "accepted" || raw === "essential") return raw;
    const parsed = JSON.parse(raw) as { choice?: unknown };
    return parsed.choice === "accepted" || parsed.choice === "essential"
      ? parsed.choice
      : "undecided";
  } catch {
    return "undecided";
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CONSENT_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CONSENT_EVENT, callback);
  };
}

function clearMetrikaStorage() {
  for (const key of Object.keys(window.localStorage)) {
    if (key.startsWith("_ym")) window.localStorage.removeItem(key);
  }
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (name?.startsWith("_ym")) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    }
  }
}

export function CookieConsent() {
  const choice = useSyncExternalStore(subscribe, readConsent, () => "loading");
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const openSettings = () => setSettingsOpen(true);
    window.addEventListener("joobby:cookie-settings", openSettings);
    return () => window.removeEventListener("joobby:cookie-settings", openSettings);
  }, []);

  function saveChoice(nextChoice: ConsentChoice) {
    const previous = readConsent();
    window.localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ choice: nextChoice, updatedAt: new Date().toISOString() }),
    );
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setSettingsOpen(false);

    if (previous === "accepted" && nextChoice === "essential") {
      clearMetrikaStorage();
      window.location.reload();
    }
  }

  const showBanner = choice === "undecided" || settingsOpen;

  return (
    <>
      {choice === "accepted" ? <Metrika /> : null}
      {showBanner ? (
        <section className={styles.banner} aria-label="Настройки cookie">
          <div className={styles.copy}>
            <strong>{settingsOpen ? "Настройки cookie" : "Cookie на сайте Joobby"}</strong>
            <p>
              Необходимые данные сохраняют выбор темы и cookie. Яндекс.Метрика
              загружается только с вашего согласия и помогает улучшать сайт. Подробнее — в{" "}
              <Link href="/privacy/#cookie">политике конфиденциальности</Link>.
            </p>
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={() => saveChoice("accepted")}>Принять</button>
            <button type="button" onClick={() => saveChoice("essential")}>Только необходимые</button>
          </div>
        </section>
      ) : null}
    </>
  );
}

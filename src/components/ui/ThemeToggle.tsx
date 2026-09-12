"use client";

type Theme = "dark" | "light";

export function ThemeToggle() {
  function toggleTheme() {
    const current = document.documentElement.dataset.theme as Theme;
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { window.localStorage.setItem("joobby-theme", next); } catch { /* Theme still works when storage is unavailable. */ }
  }

  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Переключить цветовую тему" title="Переключить тему">
    <span className="theme-icon-sun" aria-hidden="true">☀</span><span className="theme-icon-moon" aria-hidden="true">☾</span>
  </button>;
}

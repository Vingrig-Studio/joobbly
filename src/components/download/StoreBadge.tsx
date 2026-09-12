"use client";

import { downloads } from "@/config/downloads";
import { TrackedAnchor } from "@/components/ui/TrackedAnchor";
import type { Goal } from "@/lib/analytics";
import styles from "./StoreBadge.module.css";

export type PlatformIconKind = "apple" | "googlePlay" | "android" | "web";

export function PlatformIcon({ kind }: { kind: PlatformIconKind }) {
  if (kind === "apple") {
    return (
      <svg viewBox="0 0 32 38" role="img" aria-label="Apple">
        <path fill="currentColor" d="M23.7 20.1c0-4.2 3.4-6.2 3.6-6.3a7.8 7.8 0 0 0-6.1-3.3c-2.6-.3-5.1 1.6-6.4 1.6-1.4 0-3.4-1.6-5.6-1.5a8.2 8.2 0 0 0-6.9 4.2c-3 5.1-.8 12.7 2.1 16.9 1.4 2 3.1 4.3 5.3 4.2 2.1-.1 2.9-1.4 5.5-1.4 2.5 0 3.3 1.4 5.5 1.3 2.3 0 3.7-2 5.1-4.1a18.6 18.6 0 0 0 2.3-4.8 7.4 7.4 0 0 1-4.4-6.8Z" />
        <path fill="currentColor" d="M19.5 7.8A7.5 7.5 0 0 0 21.2 2a7.7 7.7 0 0 0-5.1 2.7 7.1 7.1 0 0 0-1.8 5.4 6.4 6.4 0 0 0 5.2-2.3Z" />
      </svg>
    );
  }

  if (kind === "googlePlay") {
    return (
      <svg viewBox="0 0 36 40" role="img" aria-label="Google Play">
        <path fill="#00c4cc" d="M3.1 2.3A3.7 3.7 0 0 0 2 5v30c0 1 .4 2 1.1 2.7L20.2 20 3.1 2.3Z" />
        <path fill="#62d84e" d="m4.7 1.3 19.9 11.3-4.4 7.4L3.1 2.3c.5-.6 1-.9 1.6-1Z" />
        <path fill="#ffce00" d="M24.6 27.4 4.7 38.7c-.6-.1-1.1-.4-1.6-1L20.2 20l4.4 7.4Z" />
        <path fill="#ff4b55" d="m32.1 16.9-7.5-4.3-4.4 7.4 4.4 7.4 7.5-4.3c2.5-1.4 2.5-4.8 0-6.2Z" />
      </svg>
    );
  }

  if (kind === "android") {
    return (
      <svg viewBox="0 0 36 36" role="img" aria-label="Android">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m10.8 7.2-2.2-3M25.2 7.2l2.2-3" />
        <path fill="currentColor" d="M8 14.5A10 10 0 0 1 18 6a10 10 0 0 1 10 8.5H8Zm2 2h16v12a3 3 0 0 1-3 3H13a3 3 0 0 1-3-3v-12Zm-5 1.2a2 2 0 0 1 4 0v8.8a2 2 0 0 1-4 0v-8.8Zm22 0a2 2 0 0 1 4 0v8.8a2 2 0 0 1-4 0v-8.8ZM13 28h4v5a2 2 0 0 1-4 0v-5Zm6 0h4v5a2 2 0 0 1-4 0v-5Z" />
        <circle cx="13.5" cy="11.2" r="1" fill="white" /><circle cx="22.5" cy="11.2" r="1" fill="white" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 36 36" role="img" aria-label="Веб-приложение">
      <rect x="3" y="5" width="30" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path d="M4 12h28" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="8" cy="8.5" r="1.2" fill="currentColor" />
      <circle cx="12" cy="8.5" r="1.2" fill="currentColor" opacity=".65" />
      <path d="m15 18 3-3 3 3m-3-3v9" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
    </svg>
  );
}

const stores = {
  appStore: {
    href: downloads.appStore.url,
    icon: "apple" as const,
    eyebrow: "Download on the",
    name: "App Store",
    goal: "download_app_store_click" as Goal,
  },
  googlePlay: {
    href: downloads.googlePlay.url,
    icon: "googlePlay" as const,
    eyebrow: "GET IT ON",
    name: "Google Play",
    goal: "download_google_play_click" as Goal,
  },
};

export function StoreBadge({ store }: { store: keyof typeof stores }) {
  const item = stores[store];

  return (
    <TrackedAnchor
      className={styles.badge}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      goal={item.goal}
      aria-label={`${item.eyebrow} ${item.name}`}
    >
      <span className={styles.icon} aria-hidden="true"><PlatformIcon kind={item.icon} /></span>
      <span className={styles.copy}>
        <small>{item.eyebrow}</small>
        <strong>{item.name}</strong>
      </span>
    </TrackedAnchor>
  );
}

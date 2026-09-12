"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import styles from "./VideoModal.module.css";

const VIDEO_URL = "https://joobby.ru/media/joobby-promo.mp4";
const subscribeToHydration = () => () => {};

export function VideoModal() {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const video = videoRef.current;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, video, [href], [tabindex]:not([tabindex="-1"])'
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
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      video?.pause();
      trigger?.focus();
    };
  }, [open]);

  const modal = open ? (
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <div
        className={styles.dialog}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="joobby-video-title"
      >
        <div className={styles.heading}>
          <div>
            <span>Joobby за 2 минуты</span>
            <h2 id="joobby-video-title">Посмотрите, как работает сервис</h2>
          </div>
          <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Закрыть видео">×</button>
        </div>
        <video ref={videoRef} controls autoPlay playsInline preload="metadata" poster="/hero/joobby-hero-person.png">
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      </div>
    </div>
  ) : null;

  return <>
    <button ref={triggerRef} className={styles.trigger} type="button" onClick={() => setOpen(true)} aria-haspopup="dialog">
      <span className={styles.play} aria-hidden="true" />
      <span className={styles.label}></span>
    </button>
    {mounted && modal ? createPortal(modal, document.body) : null}
  </>;
}

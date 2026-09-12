import type { Metadata } from "next";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = { title: "Видео о Joobby", description: "Посмотрите, как Joobby связывает график смен, задачи и подтверждение выполнения." };
export default function VideoPage(){return <>
  <section className="download-intro video-intro"><div><p className="eyebrow">Как это работает</p><h1>Один день в Joobby</h1><p>От публикации графика до реакции руководителя на просроченную задачу.</p></div></section>
  <section className="section-tight"><div className="container video-shell"><video controls preload="metadata" playsInline poster="/hero/joobby-hero-person.png" aria-label="Видео о работе Joobby"><source src="https://joobby.ru/media/joobby-promo.mp4" type="video/mp4" />Ваш браузер не показывает видео. <a href="https://joobby.ru/media/joobby-promo.mp4">Скачайте файл</a>.</video></div></section>
  <CTA />
</>}

import type { Metadata } from "next";
import { DemoForm } from "@/components/forms/DemoForm";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { site } from "@/config/site";
import { social } from "@/config/social";
import { visualStories } from "@/config/visuals";

export const metadata: Metadata = { title: "Контакты", description: "Связаться с командой Joobby или получить демонстрацию продукта." };
export default function ContactsPage() { return <>
  <section className="page-hero"><div className="container page-hero-grid"><div><p className="eyebrow">Контакты</p><h1>Поговорим о вашей сменной работе</h1><p className="lead">Напишите напрямую или оставьте заявку на демонстрацию — покажем Joobby на сценарии вашего бизнеса.</p></div><EditorialImage className="page-hero-photo" src={visualStories[0]} alt="Управляющая рабочей сменой" priority /></div></section>
  <section className="section-tight"><div className="container contact-grid"><aside className="contact-card"><span className="contact-orbit">J</span><h2>Связь</h2><p>Отвечаем в рабочее время.</p><a href={`mailto:${site.email}`}>{site.email}</a><a href={site.phoneHref}>{site.phoneLabel}</a>{social.telegram && <a href={social.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>}{social.vk && <a href={social.vk} target="_blank" rel="noopener noreferrer">VK</a>}<p>Поможем выбрать сценарий работы для вашей команды и ответим на вопросы о запуске.</p></aside><div id="demo"><DemoForm available={Boolean(process.env.JOOBBY_LEAD_ENDPOINT)} /></div></div></section>
</>; }

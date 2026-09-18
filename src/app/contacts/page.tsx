import type { Metadata } from "next";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { TrialButton } from "@/components/ui/TrialModalProvider";
import { visualStories } from "@/config/visuals";

export const metadata: Metadata = { title: "Контакты", description: "Связаться с командой Joobby или получить демонстрацию продукта." };
export default function ContactsPage() { return <>
  <section className="page-hero"><div className="container page-hero-grid"><div><p className="eyebrow">Контакты</p><h1>Поговорим о вашей сменной работе</h1><p className="lead">Оставьте заявку — покажем Joobby на сценарии вашего бизнеса и поможем выбрать подходящий старт.</p></div><EditorialImage className="page-hero-photo" src={visualStories[0]} alt="Управляющая рабочей сменой" priority /></div></section>
  <section className="section-tight"><div className="container contact-grid"><aside className="contact-card"><h2>Один понятный шаг</h2><p>Расскажите, сколько у вас точек. Команда Joobby перезвонит в течение рабочего дня и ответит на вопросы о запуске.</p></aside><div className="demo-form contact-lead-card"><p className="eyebrow">Заявка на подключение</p><h3>Посмотрим на ваш рабочий процесс вместе</h3><p>Откроется короткая форма: телефон и количество точек. Этого достаточно, чтобы начать разговор.</p><TrialButton source="contacts" className="button">Попробовать Joobby</TrialButton></div></div></section>
</>; }

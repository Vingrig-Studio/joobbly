import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductVisual } from "@/components/product/ProductVisual";
import { HomeCapabilities } from "@/components/sections/HomeCapabilities";
import { HomePricing } from "@/components/sections/HomePricing";
import { IndustrySwitcher } from "@/components/sections/IndustrySwitcher";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/ui/FAQ";
import { TrialButton } from "@/components/ui/TrialModalProvider";
import { VideoModal } from "@/components/video/VideoModal";
import styles from "./experience.module.css";
export const metadata: Metadata = { title: "Joobby — команда на смене, всё под контролем", description: "График смен, чек-листы и фотоотчёты в одном приложении. Управляйте работой команды на каждой точке." };
const faq = [{ question: "Что считается точкой?", answer: "Одно физическое заведение или объект: кафе, магазин, отель или площадка. Количество сотрудников на точке не влияет на стоимость." }, { question: "Что будет после 30 бесплатных дней?", answer: "Можно продолжить работу на тарифе от 490 ₽ за точку в месяц. Условия для сети уточнит команда Joobby." }, { question: "Нужно ли менять кассу или учётную систему?", answer: "Нет. Joobby работает самостоятельно и дополняет вашу кассу или учётную систему." }, { question: "Как сотруднику войти в приложение?", answer: "Установить Joobby и войти с адресом электронной почты, на который пришло приглашение. Для входа используется одноразовый код." }, { question: "Можно ли прикрепить старую фотографию?", answer: "Фото-подтверждение делается камерой внутри Joobby. Вместе со снимком сохраняются автор и время." }, { question: "Можно ли выгрузить отработанные часы?", answer: "Да. Отчёт по часам можно выгрузить в Excel для дальнейшей работы с данными." }];
export default function Home() {
    return <div className={styles.home}>
    <section className={styles.hero} data-home-hero aria-labelledby="hero-title"><Image className={styles.heroImage} src="/hero/joobby-hero-person.png" alt="Сотрудница проверяет смену и задачи в приложении Joobby" fill priority sizes="100vw" unoptimized/><div className={styles.shade}/><div className={styles.heroContent}><p className={styles.kicker}>Joobby</p><h1 id="hero-title">Порядок в каждой смене</h1><p>График смен, задачи, чек-листы и контроль команды
    </p><div className={styles.heroActions}><TrialButton className="button" source="hero">Попробовать</TrialButton><VideoModal /></div><small>30 дней бесплатно · без банковской карты</small></div><div className={styles.heroFoot}><span></span><Link href="/download/">Скачать приложение ↗</Link></div></section>
    <section className={styles.replaces} aria-labelledby="replaces-title"><div className={styles.replacesInner}><p id="replaces-title">Заменяет связку</p><ul><li>Excel</li><li>WhatsApp</li><li>Бумажные чек-листы</li><li>Отдельные приложения</li></ul></div></section>
    <section id="how-it-works" className={styles.workflow}><div className={styles.sectionHeading}><div><p className={styles.kicker}>01 / Как это работает</p><h2>Два взгляда.<br />Одна рабочая смена.</h2></div><p>Переключите роль и отметьте задачу. Посмотрите, как результат появляется у руководителя.</p></div><ProductVisual /><div className={styles.stepLine}><div><b>01</b><span>Менеджер публикует график</span></div><div><b>02</b><span>Сотрудник выполняет задачи</span></div><div><b>03</b><span>Руководитель видит результат</span></div></div></section>
    <HomeCapabilities />
    <section id="business" className="section solutions-home-section"><div className="container"><div className="section-head"><p className="eyebrow">Для вашего бизнеса</p><h2>Разные команды.<br />Понятный порядок работы.</h2><p className="lead">От кофейни до производства — выберите сценарий своей команды.</p></div><IndustrySwitcher /></div></section>
    <HomePricing />
    <section className={styles.faq}><div><p className={styles.kicker}>Перед стартом</p><h2>Есть вопросы?</h2><p>Здесь главное. Если ваш случай сложнее — обсудим его лично.</p><Link href="/contacts/">Связаться с командой ↗</Link></div><FAQ items={faq}/></section>
    <CTA />
    </div>;
}

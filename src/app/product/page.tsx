import type { Metadata } from "next";
import Link from "next/link";
import { CTA } from "@/components/sections/CTA";
import { products } from "@/config/navigation";
import styles from "./product.module.css";

export const metadata: Metadata = { title: "Возможности", description: "График смен, чек-листы, фото-подтверждение, учёт времени, дашборд и отчёты Joobby." };

function ProductIcon({ slug }: { slug: (typeof products)[number]["slug"] }) {
  const common = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

  if (slug === "grafik-smen") return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" /></svg>;
  if (slug === "chek-listy") return <svg {...common}><path d="m4 7 2 2 3-3M4 13l2 2 3-3M4 19l2 2 3-3" /><path d="M12 8h8M12 14h8M12 20h8" /></svg>;
  if (slug === "foto-dokazatelstvo") return <svg {...common}><path d="M5 7h3l1.5-2h5L16 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" /><circle cx="12" cy="13" r="4" /></svg>;
  if (slug === "uchet-vremeni") return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>;
  if (slug === "dashboard") return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7 16v-4M12 16V8M17 16v-7" /></svg>;
  return <svg {...common}><path d="M6 3h9l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M14 3v5h5M8 12h7M8 16h7" /></svg>;
}

export default function ProductPage() {
  return <div className={styles.page}>
    <section className={styles.intro} aria-labelledby="product-title">
      <div className={styles.container}>
        <p className={styles.eyebrow}>Продукт</p>
        <h1 id="product-title">Возможности Joobby</h1>
        <p className={styles.lead}>График смен, чек-листы с фото-подтверждением, учёт времени, отчёты и дашборд дня. Всё для сменной работы — в одном приложении.</p>
        <p className={styles.introNote}>Joobby соединяет планирование смен и контроль задач. Менеджер видит картину дня, сотрудник — свои смены и задачи в телефоне.</p>
      </div>
    </section>

    <section className={styles.modules} aria-label="Модули Joobby">
      <div className={`${styles.container} ${styles.grid}`}>{products.map((item) => <article className={styles.card} key={item.slug}>
        <div className={styles.icon}><ProductIcon slug={item.slug} /></div>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <Link href={`/product/${item.slug}/`}>Подробнее <span aria-hidden="true">→</span></Link>
      </article>)}</div>
    </section>

    <div className={styles.cta}><CTA /></div>
  </div>;
}

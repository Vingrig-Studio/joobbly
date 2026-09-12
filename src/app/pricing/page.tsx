import type { Metadata } from "next";
import { TrialButton } from "@/components/ui/TrialModalProvider";
import { pricingPlans } from "@/config/pricing";
import styles from "./pricing.module.css";

export const metadata: Metadata = {
  title: "Тарифы Joobby",
  description: "Выберите план Joobby: 30 дней бесплатно, месяц, полгода со скидкой 10% или год со скидкой 16%.",
};

const features = [
  "Все функции Joobby без доплат",
  "Безлимит сотрудников на точке",
  "Приложения для iOS, Android и веб",
  "Поддержка команды Joobby",
] as const;

function formatRubles(value: number) {
  const hasKopecks = !Number.isInteger(value);
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: hasKopecks ? 2 : 0,
    maximumFractionDigits: hasKopecks ? 2 : 0,
  }).format(value);
}

function periodLabel(months: number) {
  if (months === 1) return "за месяц";
  if (months === 6) return "за 6 месяцев";
  return "за год";
}

export default function PricingPage() {
  return <div className={styles.page}>
    <section className={styles.scene} aria-labelledby="pricing-page-title">
      <div className={styles.intro}>
        <p className={styles.kicker}>Тарифы Joobby</p>
        <h1 id="pricing-page-title">Выберите свой план</h1>
        <p>Все возможности сервиса уже включены. Цена указана за одну точку — количество сотрудников не влияет на стоимость.</p>
      </div>

      <div className={styles.grid}>
        {pricingPlans.map((plan) => {
          const monthly = plan.months ? plan.total / plan.months : 0;
          return <article className={`${styles.card} ${"popular" in plan && plan.popular ? styles.popular : ""}`} key={plan.id}>
            <div className={styles.cardTop}>
              <div>
                <span className={styles.eyebrow}>{plan.eyebrow}</span>
                <h2>{plan.title}</h2>
              </div>
              {plan.discount > 0 && <span className={styles.discount}>−{plan.discount}%</span>}
            </div>

            {plan.months === 0 ? <div className={styles.freePrice}>
              <strong>30</strong><span>дней</span><small>бесплатно</small>
            </div> : <div className={styles.priceBlock}>
              {plan.discount > 0 && <del>{formatRubles(plan.originalTotal)} ₽</del>}
              <div className={styles.price}><strong>{formatRubles(plan.total)}</strong><span>₽</span></div>
              <p>{periodLabel(plan.months)} · {formatRubles(monthly)} ₽/мес.</p>
            </div>}

            <p className={styles.description}>{plan.description}</p>
            <TrialButton className={styles.cta} source="pricing" plan={plan.title}>{plan.cta}</TrialButton>
            <p className={styles.note}>{plan.note}</p>

            <ul className={styles.features}>
              {features.map((feature) => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}
            </ul>
          </article>;
        })}
      </div>

      <p className={styles.finePrint}>Стоимость указана за одну точку. После бесплатного периода платный план подключается только по вашему выбору.</p>
    </section>
  </div>;
}

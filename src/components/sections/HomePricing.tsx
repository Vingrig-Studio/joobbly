import { TrackedAnchor } from "@/components/ui/TrackedAnchor";
import { pricing } from "@/config/pricing";
import { site } from "@/config/site";
import styles from "./HomePricing.module.css";

const features = [
  "График смен и публикация по неделям",
  "Чек-листы с фото, гео и временем",
  "Учёт времени и дашборд дня",
  "Приложения iOS, Android и веб",
  "Безлимит сотрудников на точке"
] as const;

export function HomePricing() {
  return <section id="pricing" className={styles.scene} aria-labelledby="pricing-title">
    <div className={styles.inner}>
      <div className={styles.heading}>
        <p className="eyebrow">Тариф</p>
        <h2 id="pricing-title">Платите за точки,<br />а не за людей</h2>
        <p>Один тариф со всеми функциями. Сколько бы сотрудников ни было на точке, цена не растёт.</p>
      </div>

      <article className={styles.card}>
        <span className={styles.badge}>Всё включено</span>
        <div className={styles.price}>
          <span>от</span>
          <strong>{pricing.basePrice}</strong>
          <sup>₽</sup>
          <small>/ {pricing.unit}</small>
        </div>
        <p className={styles.description}>Без тарифной матрицы и доплат за модули. Чем больше точек, тем выгоднее.</p>
        <ul className={styles.features}>
          {features.map((feature) => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}
        </ul>
        <TrackedAnchor className={styles.cta} href={site.registrationUrl} target="_blank" rel="noopener noreferrer" goal="pricing_cta_click">
          Попробовать бесплатно
        </TrackedAnchor>
        <small className={styles.note}>{pricing.trialDays} дней бесплатно · без банковской карты</small>
      </article>
    </div>
  </section>;
}

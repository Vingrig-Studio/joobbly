import { site } from "@/config/site";
import { DemoButton } from "@/components/forms/DemoForm";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { visualStories } from "@/config/visuals";

export function CTA() {
  return <section className="section"><div className="container"><div className="cta-band">
    <div className="cta-copy"><p className="eyebrow">Всё видно в тот же день</p><h2>Узнайте, что происходит на каждой смене</h2>
      <p>30 дней бесплатно · без банковской карты · любое количество сотрудников на точке</p>
      <div className="button-row"><a className="button button-white" href={site.registrationUrl} target="_blank" rel="noopener noreferrer">Начать бесплатно</a><DemoButton className="button button-outline-light" /></div>
    </div>
    <EditorialImage className="cta-photo" src={visualStories[5]} alt="Руководитель и сотрудница проверяют результат смены" />
  </div></div></section>;
}

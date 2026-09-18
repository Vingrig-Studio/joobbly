import { EditorialImage } from "@/components/ui/EditorialImage";
import { TrialButton } from "@/components/ui/TrialModalProvider";
import { visualStories } from "@/config/visuals";

export function CTA() {
  return <section className="section"><div className="container"><div className="cta-band">
    <div className="cta-copy"><p className="eyebrow">Всё видно в тот же день</p><h2>Узнайте, что происходит на каждой смене</h2>
      <p>30 дней бесплатно · без банковской карты · любое количество сотрудников на точке</p>
      <div className="button-row"><TrialButton className="button button-white" source="cta">Попробовать Joobby</TrialButton></div>
    </div>
    <EditorialImage className="cta-photo" src={visualStories[5]} alt="Руководитель и сотрудница проверяют результат смены" />
  </div></div></section>;
}

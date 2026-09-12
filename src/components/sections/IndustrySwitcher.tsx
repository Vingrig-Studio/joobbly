"use client";

import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { TrialButton } from "@/components/ui/TrialModalProvider";
import { industries } from "@/config/navigation";
import { track } from "@/lib/analytics";

const industryImages = Object.fromEntries(
  industries.map((industry) => [industry.slug, `/industries/${industry.slug}.png`])
) as Record<(typeof industries)[number]["slug"], string>;

export function IndustrySwitcher() {
  const [selected, setSelected] = useState(0);
  const [shown, setShown] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const item = industries[shown];

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function selectIndustry(index: number) {
    if (index === selected) return;
    setSelected(index);
    setIsLeaving(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setShown(index);
      requestAnimationFrame(() => setIsLeaving(false));
    }, 180);
    track("industry_select", { industry: industries[index].slug });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const next = (index + direction + industries.length) % industries.length;
    selectIndustry(next);
    document.getElementById(`industry-tab-${next}`)?.focus();
  }

  return <div className="solution-switcher">
    <div className="solution-nav" role="tablist" aria-label="Выберите отрасль">
      <p>Выберите отрасль</p>
      {industries.map((industry, index) => <button
        id={`industry-tab-${index}`}
        key={industry.slug}
        className={index === selected ? "active" : ""}
        type="button"
        role="tab"
        tabIndex={index === selected ? 0 : -1}
        aria-controls="industry-solution-panel"
        aria-selected={index === selected}
        onClick={() => selectIndustry(index)}
        onKeyDown={(event) => handleKeyDown(event, index)}
      ><span>{String(index + 1).padStart(2, "0")}</span><strong>{industry.title}</strong><i>↗</i></button>)}
    </div>

    <div
      id="industry-solution-panel"
      className={`solution-stage ${isLeaving ? "is-leaving" : ""}`}
      role="tabpanel"
      aria-labelledby={`industry-tab-${shown}`}
      aria-live="polite"
    >
      <div className="solution-stage-hero">
        <EditorialImage className="solution-stage-photo" src={industryImages[item.slug]} alt={`Временный фон для отрасли «${item.title}»`} />
        <div className="solution-stage-shade" />
        <div className="solution-stage-copy"><span>Сценарий {shown + 1} из {industries.length}</span><h3>{item.title}</h3><p>График, роли и обязательные действия собраны вокруг реальной смены.</p></div>
      </div>

      <div className="solution-detail-panel">
        <div className="solution-detail-team"><span className="solution-detail-label">Команда</span><div>{item.roles.map((role) => <b key={role}>{role}</b>)}</div></div>
        <div className="solution-detail-tasks"><span className="solution-detail-label">Смена сегодня</span><ul>{item.tasks.map((task, index) => <li key={task}><i>{index + 1}</i>{task}</li>)}</ul></div>
        <div className="solution-detail-result"><span className="solution-detail-label">Что получает руководитель</span><p>{item.outcome}</p><TrialButton className="solution-trial-button" source="industry">Попробовать Joobby <span aria-hidden="true">↗</span></TrialButton></div>
      </div>
    </div>
  </div>;
}

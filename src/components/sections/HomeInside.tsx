import { EditorialImage } from "@/components/ui/EditorialImage";
import { visualStories } from "@/config/visuals";

const shiftRows = [
  { initials: "АМ", name: "Анна Мельник", role: "Бариста · 09:00–18:00", status: "на смене", tone: "green" },
  { initials: "ИК", name: "Илья Котов", role: "Повар · 10:00–22:00", status: "через 24 мин", tone: "blue" },
  { initials: "МС", name: "Мария Соколова", role: "Официант · 12:00–23:00", status: "опаздывает", tone: "orange" }
] as const;

const week = [
  { day: "пн", value: 92 },
  { day: "вт", value: 100 },
  { day: "ср", value: 86 },
  { day: "чт", value: 64, current: true },
  { day: "пт", value: 0 },
  { day: "сб", value: 0 }
] as const;

export function HomeInside() {
  return <section className="inside-scene" aria-labelledby="inside-title">
    <div className="inside-scene-inner">
      <h2 id="inside-title">Что ждёт внутри</h2>
      <div className="inside-story-grid">
        <article className="inside-story">
          <div className="inside-story-visual inside-shift-demo">
            <div className="inside-demo-top"><span>Сегодня, 8 сентября</span><b>7 из 8</b></div>
            <div className="inside-shift-list">{shiftRows.map((row) => <div className="inside-shift-row" key={row.name}>
              <span className="inside-avatar">{row.initials}</span>
              <span><strong>{row.name}</strong><small>{row.role}</small></span>
              <em className={`inside-status inside-status-${row.tone}`}>{row.status}</em>
            </div>)}</div>
          </div>
          <div className="inside-story-copy"><h3>Смена без догадок</h3><p>Сразу видно, кто работает, кто задерживается и где не хватает человека.</p></div>
        </article>

        <article className="inside-story">
          <div className="inside-story-visual inside-publish-demo">
            <EditorialImage src={visualStories[0]} alt="Управляющая публикует рабочий график" sizes="(max-width: 760px) 100vw, 25vw" />
            <div className="inside-glass-note"><span>График опубликован</span><strong>12 сотрудников увидят обновление</strong><i>✓</i></div>
          </div>
          <div className="inside-story-copy"><h3>График у всей команды</h3><p>Изменение появляется у сотрудников сразу — без новых файлов и сообщений в чатах.</p></div>
        </article>

        <article className="inside-story">
          <div className="inside-story-visual inside-task-demo">
            <div className="inside-task-head"><span>Открытие точки</span><b>4 из 6</b></div>
            <div className="inside-task-progress"><span /></div>
            <p>Проверить готовность зала</p>
            <div className="inside-task-options"><span>Фото</span><span>до 09:15</span><span>обязательно</span></div>
            <div className="inside-task-proof"><span>✓</span><div><strong>Подтверждено</strong><small>Анна · 09:08 · Гаражная, 14</small></div></div>
          </div>
          <div className="inside-story-copy"><h3>Задачи прямо в смене</h3><p>У каждой задачи есть срок, исполнитель и подтверждение фактического результата.</p></div>
        </article>

        <article className="inside-story">
          <div className="inside-story-visual inside-progress-demo">
            <div className="inside-progress-top"><span>Неделя</span><strong>86%</strong><small>выполнено</small></div>
            <div className="inside-week">{week.map((item) => <div className={"current" in item && item.current ? "is-current" : ""} key={item.day}>
              <span>{item.day}</span><i><b style={{ height: `${item.value}%` }} /></i><em>{item.value ? `${item.value}%` : "—"}</em>
            </div>)}</div>
          </div>
          <div className="inside-story-copy"><h3>Проблема видна вовремя</h3><p>Прогресс и отклонения собраны в одном экране, пока ещё можно вмешаться.</p></div>
        </article>
      </div>
    </div>
  </section>;
}

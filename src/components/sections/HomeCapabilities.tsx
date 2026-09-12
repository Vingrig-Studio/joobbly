import Link from "next/link";

const schedule = [
  { day: "пн", date: "8", name: "Анна", time: "09:00–18:00", tone: "sky" },
  { day: "вт", date: "9", name: "Илья", time: "10:00–22:00", tone: "lime" },
  { day: "ср", date: "10", name: "Мария", time: "12:00–23:00", tone: "sand" },
  { day: "чт", date: "11", name: "Анна", time: "09:00–18:00", tone: "sky" },
  { day: "пт", date: "12", name: "Илья", time: "10:00–22:00", tone: "lime" }
] as const;

const tasks = [
  { label: "Открыть кассу", done: true },
  { label: "Проверить температуру", done: true },
  { label: "Подготовить зал", done: false }
] as const;

export function HomeCapabilities() {
  return <section className="capabilities-scene" aria-labelledby="capabilities-title">
    <div className="capabilities-inner">
      <div className="capabilities-head">
        <p className="eyebrow">Возможности</p>
        <h2 id="capabilities-title">Всё, что держит<br />смену вместе</h2>
        <p>График задаёт план. Задачи объясняют, что сделать. Подтверждения показывают результат.</p>
      </div>

      <div className="capabilities-grid">
        <Link className="capability-card capability-schedule" href="/product/grafik-smen/">
          <div className="capability-card-top"><span>График смен</span><b>↗</b></div>
          <div className="schedule-copy">
            <div>
              <h3>Актуальная неделя у всей команды</h3>
              <p>Смены, сотрудники и пересечения собраны в одном рабочем плане.</p>
            </div>
            <dl className="schedule-stats" aria-label="Сводка по графику">
              <div><dt>В команде</dt><dd>7 <span>сотрудников</span></dd></div>
              <div><dt>Конфликты</dt><dd>0 <span>пересечений</span></dd></div>
            </dl>
          </div>
          <div className="schedule-ui">
            <div className="schedule-ui-head"><span>8–14 сентября</span><strong>Опубликовано</strong></div>
            <div className="schedule-days">{schedule.map((shift) => <div className="schedule-day" key={shift.day}>
              <span>{shift.day}</span><b>{shift.date}</b>
              <div className={`schedule-shift schedule-shift-${shift.tone}`}><strong>{shift.name}</strong><small>{shift.time}</small></div>
            </div>)}</div>
            <div className="schedule-summary"><span>Обновлено 2 минуты назад</span><b>Команда уведомлена</b></div>
          </div>
        </Link>

        <Link className="capability-card capability-tasks" href="/product/chek-listy/">
          <div className="capability-card-top"><span>Чек-листы</span><b>↗</b></div>
          <h3>Нужный стандарт появляется сам</h3>
          <div className="task-ui">
            <div className="task-ui-head"><span>Открытие точки</span><b>2 из 3</b></div>
            {tasks.map((task) => <div className={task.done ? "is-done" : ""} key={task.label}><i>{task.done ? "✓" : ""}</i><span>{task.label}</span></div>)}
          </div>
        </Link>

        <Link className="capability-card capability-proof" href="/product/foto-dokazatelstvo/">
          <div className="capability-card-top"><span>Фото-подтверждение</span><b>↗</b></div>
          <h3>Не галочка, а фактический результат</h3>
          <div className="camera-ui">
            <span className="camera-label">Камера Joobby</span>
            <i className="camera-corner camera-corner-one" /><i className="camera-corner camera-corner-two" />
            <i className="camera-corner camera-corner-three" /><i className="camera-corner camera-corner-four" />
            <div className="camera-meta"><span>Гаражная, 14</span><b>09:08</b></div>
            <span className="camera-shutter" />
          </div>
        </Link>

        <article className="capability-card capability-dashboard">
          <div className="capability-dashboard-copy">
            <div className="capability-card-top"><span>Дашборд дня</span><Link href="/product/dashboard/" aria-label="Подробнее о дашборде дня">↗</Link></div>
            <h3>Вся смена — на одном экране</h3>
            <p>Руководитель видит только то, что требует решения сейчас.</p>
            <div className="capability-subnav"><Link href="/product/uchet-vremeni/">Учёт времени</Link><Link href="/product/otchety/">Отчёты</Link></div>
          </div>
          <div className="dashboard-ui">
            <div className="dashboard-metrics"><div><b>7/8</b><span>на смене</span></div><div><b>86%</b><span>задач готово</span></div><div className="needs-action"><b>2</b><span>нужна реакция</span></div></div>
            <div className="dashboard-row"><i className="is-green" /><strong>Гаражная, 14</strong><span>всё по плану</span></div>
            <div className="dashboard-row"><i className="is-orange" /><strong>Невский, 42</strong><span>1 просрочка</span></div>
            <div className="dashboard-row"><i className="is-green" /><strong>Литейный, 8</strong><span>открыта</span></div>
          </div>
        </article>
      </div>
    </div>
  </section>;
}

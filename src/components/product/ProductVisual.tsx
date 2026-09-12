"use client";
import { useState } from "react";
import styles from "./ProductVisual.module.css";
const jobs = ["Витрина заполнена", "Кофемашина готова", "Температура проверена", "Зал готов к открытию"];
export function ProductVisual({ compact = false }: {
    compact?: boolean;
}) {
    const [role, setRole] = useState<"manager" | "employee">("manager");
    const [done, setDone] = useState([true, true, true, false]);
    const total = done.filter(Boolean).length;
    return <div className={`${styles.demo} ${compact ? styles.compact : ""}`}>
    <div className={styles.toolbar}><div className={styles.tabs} role="group" aria-label="Чей экран показать"><button type="button" aria-pressed={role === "manager"} onClick={() => setRole("manager")}>Руководитель</button><button type="button" aria-pressed={role === "employee"} onClick={() => setRole("employee")}>Сотрудник</button></div></div>
    <div className={styles.workspace}>
      <aside className={styles.sidebar}><span className={styles.brand}>Joobby<span>Рабочий день</span></span><span className={styles.selected}>Обзор смены</span><span>Расписание</span><span>Чек-листы</span><span>Команда</span><small>Демонстрация интерфейса</small></aside>
      <div className={styles.screen}>
        <div className={styles.screenHeading}><div><p>{role === "manager" ? "Все точки · сегодня" : "Гаражная, 14 · сегодня"}</p><h3>{role === "manager" ? "Смена под контролем" : "Доброе утро, Анна"}</h3></div><span className={styles.live}>На смене</span></div>
        {role === "manager" ? <><div className={styles.metrics}><div><strong>7<span>/8</span></strong><p>сотрудников на смене</p></div><div><strong>{total === 4 ? "100" : "75"}<span>%</span></strong><p>задач открытия готово</p></div><div><strong>{total === 4 ? "0" : "1"}</strong><p>задача ожидает</p></div></div><div className={styles.tableHead}><span>Точка</span><span>Статус открытия</span><span>Сотрудники</span></div><div className={styles.tableRow}><strong>Гаражная, 14</strong><span className={total === 4 ? styles.good : styles.pending}>{total === 4 ? "Открытие завершено" : "Осталась 1 задача"}</span><span>Анна · бариста</span></div><div className={styles.tableRow}><strong>Невский, 42</strong><span className={styles.good}>Всё по плану</span><span>Илья · менеджер</span></div><div className={styles.tableRow}><strong>Литейный, 8</strong><span className={styles.good}>Точка открыта</span><span>Мария · продавец</span></div><div className={styles.insight}><span>Следующий шаг</span><p>{total === 4 ? "Анна завершила открытие. Изменение сразу видно руководителю." : "У Анны осталась проверка зала. Переключитесь на экран сотрудника и отметьте задачу."}</p><button type="button" onClick={() => setRole("employee")}>Открыть экран сотрудника →</button></div></> : <div className={styles.employee}><div className={styles.shift}><span>Моя смена</span><h4>Бариста</h4><strong>09:00 — 18:00</strong><p>Открытие точки<br />Гаражная, 14</p><span className={styles.good}>Вы на смене</span></div><div className={styles.checklist}><div className={styles.checklistHead}><h4>Открытие точки</h4><span aria-live="polite">{total} из 4</span></div><progress max={4} value={total} aria-label="Прогресс чек-листа"/>{jobs.map((job, index) => <label key={job}><input type="checkbox" checked={done[index]} onChange={() => setDone(values => values.map((value, i) => i === index ? !value : value))}/><span>{job}</span></label>)}<p>Это пробный чек-лист. Отметки меняют только этот пример.</p><button type="button" onClick={() => setRole("manager")}>Посмотреть результат у руководителя →</button></div></div>}
      </div>
    </div>
  </div>;
}

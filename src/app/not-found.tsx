import Link from "next/link";
export default function NotFound(){return <section className="page-hero"><div className="container"><p className="eyebrow">Ошибка 404</p><h1>Эта смена не найдена</h1><p className="lead">Страница могла переехать или ссылка набрана с ошибкой.</p><Link className="button" href="/">Вернуться на главную</Link></div></section>}

import Link from "next/link";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav className="breadcrumbs" aria-label="Хлебные крошки"><Link href="/">Главная</Link><span>/</span>{items.map((item) => item.href ? <span key={item.label}><Link href={item.href}>{item.label}</Link><i>/</i></span> : <span key={item.label} aria-current="page">{item.label}</span>)}</nav>;
}

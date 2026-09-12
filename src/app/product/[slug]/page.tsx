import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductVisual } from "@/components/product/ProductVisual";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/ui/FAQ";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { products } from "@/config/navigation";
import { productVisuals } from "@/config/visuals";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const item = products.find((x) => x.slug === slug); return item ? { title: item.title, description: item.description, alternates: { canonical: `/product/${slug}/` } } : {}; }

export default async function ProductDetail({ params }: Props) {
  const { slug } = await params; const item = products.find((x) => x.slug === slug); if (!item) notFound();
  const related = products.filter((x) => x.slug !== item.slug).slice(0, 3);
  const faq = [{ question: `Как ${item.title.toLowerCase()} связаны со сменой?`, answer: "Joobby использует опубликованный график, роль сотрудника, точку и заданное время — поэтому действия и результат остаются в контексте конкретной смены." }, { question: "Что видит сотрудник?", answer: "Только свои актуальные смены и задачи. Интерфейс не перегружен управленческими функциями." }];
  return <><section className="page-hero"><div className="container page-hero-grid"><div><Breadcrumbs items={[{ label: "Продукт", href: "/product/" }, { label: item.title }]} /><p className="eyebrow">Возможность Joobby</p><h1>{item.title}</h1><p className="lead">{item.description}</p><div className="result-banner">Результат: {item.result.toLowerCase()}</div></div><EditorialImage className="page-hero-photo" src={productVisuals[item.slug]} alt={`${item.title} в реальной смене`} priority /></div></section>
    <section className="section-tight section-white"><div className="container"><ProductVisual compact /></div></section>
    <section className="section"><div className="container"><div className="section-head"><p className="eyebrow">Как работает</p><h2>От настройки до результата — три понятных шага</h2></div><div className="three-grid">{item.steps.map((step, index) => <article className="info-card" key={step}><span className="big-number">0{index + 1}</span><h3>{step}</h3><p>Данные сразу остаются связаны с точкой, сменой и ответственным сотрудником.</p></article>)}</div></div></section>
    <section className="section section-white"><div className="container"><div className="section-head"><p className="eyebrow">Работает вместе</p><h2>Связанные возможности</h2></div><div className="three-grid related-grid">{related.map((product) => <a className="info-card related-card" href={`/product/${product.slug}/`} key={product.slug}><EditorialImage src={productVisuals[product.slug]} alt={`${product.title} в работе`} /><h3>{product.title}</h3><p>{product.result}</p><strong>Открыть <span>↗</span></strong></a>)}</div></div></section>
    <section className="section"><div className="container"><div className="section-head"><h2>Вопросы о функции</h2></div><FAQ items={faq} /></div></section><CTA /></>;
}

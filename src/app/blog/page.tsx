import type { Metadata } from "next";
import Link from "next/link";
import { CTA } from "@/components/sections/CTA";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { articles } from "@/content/blog";

export const metadata: Metadata = { title: "Блог", description: "Практика управления сменами, графиками и чек-листами от Joobby." };
export default function BlogPage() { return <>
  <section className="page-hero"><div className="container page-hero-grid"><div><p className="eyebrow">Блог</p><h1>Практика управления сменами</h1><p className="lead">Графики, чек-листы и контроль качества без теории ради теории.</p></div><EditorialImage className="page-hero-photo" src="/blog/cover.png" alt="Фирменная обложка блога Joobby" priority /></div></section>
  <section className="section-tight"><div className="container article-grid">{articles.map((article)=><Link className="article-card" href={`/blog/${article.slug}/`} key={article.slug}><EditorialImage src={article.image} alt={`Обложка статьи: ${article.title}`} /><div className="article-copy"><span className="article-meta">{article.category} · {article.readingMinutes} мин</span><h2>{article.title}</h2><p>{article.description}</p><span className="article-link">Читать <b>↗</b></span></div></Link>)}</div></section>
  <CTA />
</>; }

import Image from "next/image";
import Link from "next/link";
import { StoreBadge } from "@/components/download/StoreBadge";
import { CookieSettingsButton } from "@/components/privacy/CookieSettingsButton";
import { industries, products } from "@/config/navigation";
import { site } from "@/config/site";
import { social } from "@/config/social";

export function Footer() {
  return <footer className="footer">
    <div className="container footer-grid">
      <div className="footer-brand">
        <Link className="logo logo-light" href="/"><Image src="/brand/joobby-mark.svg" width={42} height={42} alt="" />Joobby</Link>
        <p>Смены, задачи и контроль работы — в одном приложении.</p>
        <div className="social-links">
          <a href={social.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>
        </div>
      </div>
      <div><h2>Продукт</h2>{products.map((item) => <Link key={item.slug} href={`/product/${item.slug}/`}>{item.title}</Link>)}<Link href="/pricing/">Тарифы</Link></div>
      <div><h2>Решения</h2><Link href="/#business">Для вашего бизнеса</Link>{industries.map((item) => <span className="footer-label" key={item.slug}>{item.title}</span>)}</div>
      <div><h2>Связь</h2><a href={`mailto:${site.email}`}>{site.email}</a><a href={site.phoneHref}>{site.phoneLabel}</a><Link href="/download/">Скачать приложение</Link></div>
    </div>
    <div className="container footer-store-strip">
      <div className="footer-store-copy"><span>Приложение Joobby</span><h2>Скачать Joobby</h2></div>
      <div className="footer-store-badges"><StoreBadge store="appStore" /><StoreBadge store="googlePlay" /></div>
    </div>
    <div className="container footer-bottom"><span>© 2026 Joobby</span><div><Link href="/privacy/">Политика конфиденциальности</Link><CookieSettingsButton /></div></div>
  </footer>;
}

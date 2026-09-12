import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "./foundation.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/privacy/CookieConsent";
import { TrialModalProvider } from "@/components/ui/TrialModalProvider";
import { site } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Joobby — смены, задачи и контроль работы", template: "%s — Joobby" },
  description: site.description,
  alternates: { canonical: "/", languages: { "ru-RU": "/" } },
  openGraph: { siteName: "Joobby", locale: "ru_RU", type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630 }] },
  manifest: "/manifest.webmanifest",
  icons: { icon: "/brand/joobby-mark.svg", apple: "/brand/joobby-mark.svg" }
};

const organization = { "@context": "https://schema.org", "@type": "Organization", name: "Joobby", url: site.url, email: site.email, telephone: "+79219220890", logo: `${site.url}/brand/joobby-mark.svg` };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning><body><Script id="theme-init" strategy="beforeInteractive">{"try{var t=localStorage.getItem('joobby-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){}"}</Script><TrialModalProvider><a className="skip-link" href="#content">К содержанию</a><Header /><main id="content">{children}</main><Footer /><CookieConsent /></TrialModalProvider><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /></body></html>;
}

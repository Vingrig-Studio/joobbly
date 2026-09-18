"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/config/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { TrialButton } from "@/components/ui/TrialModalProvider";
export function Header() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [heroPassed, setHeroPassed] = useState(false);
    const pathname = usePathname();
    const overlaysHero = pathname === "/";
    const showTrial = !overlaysHero || heroPassed;
    const menu = useRef<HTMLDivElement>(null);
    const toggle = useRef<HTMLButtonElement>(null);
    useEffect(() => { const update = () => setScrolled(window.scrollY > 24); update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
    useEffect(() => {
        if (!overlaysHero) return;
        const hero = document.querySelector<HTMLElement>("[data-home-hero]");
        if (!hero) return;
        const observer = new IntersectionObserver(([entry]) => {
            setHeroPassed(!entry.isIntersecting && entry.boundingClientRect.bottom <= 76);
        }, { rootMargin: "-76px 0px 0px 0px", threshold: 0 });
        observer.observe(hero);
        return () => observer.disconnect();
    }, [overlaysHero]);
    useEffect(() => { document.body.classList.toggle("menu-open", open); if (open)
        menu.current?.querySelector<HTMLAnchorElement>("a")?.focus(); const close = (event: KeyboardEvent) => { if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
    } if (event.key !== "Tab" || !open)
        return; const elements = [toggle.current, ...Array.from(menu.current?.querySelectorAll<HTMLElement>("a,button") ?? [])].filter((e): e is HTMLElement => !!e); const first = elements[0], last = elements[elements.length - 1]; if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
    }
    else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
    } }; const desktop = window.matchMedia("(min-width:1121px)"); const resized = () => { if (desktop.matches)
        setOpen(false); }; document.addEventListener("keydown", close); desktop.addEventListener("change", resized); return () => { document.body.classList.remove("menu-open"); document.removeEventListener("keydown", close); desktop.removeEventListener("change", resized); }; }, [open]);
    const active = (href: string) => pathname === href || pathname.startsWith(href.replace(/\/$/, "") + "/");
    return <header className={`header ${overlaysHero ? "header--overlay" : ""} ${(overlaysHero ? heroPassed : scrolled) ? "header--scrolled" : ""} ${showTrial ? "header--trial-visible" : ""} ${open ? "header--menu-open" : ""}`}><div className="container header-row"><Link className="logo" href="/" aria-label="Joobby — главная" onClick={() => setOpen(false)}><Image src={overlaysHero ? "/brand/joobby-mark-inverse.svg" : "/brand/joobby-mark.svg"} width={38} height={38} alt="" priority/><span>Joobby</span></Link><nav className="desktop-nav" aria-label="Основная навигация">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined}>{item.label}</Link>)}</nav><div className="header-actions"><ThemeToggle /><span className="lang" aria-label="Текущий язык: русский" title="Пока доступен русский язык">RU</span><TrialButton className={`button button-small header-trial ${showTrial ? "is-visible" : ""}`} source="header" inactive={!showTrial}>Попробовать</TrialButton><button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Закрыть меню" : "Открыть меню"} onClick={() => setOpen(!open)}><span /><span /></button></div></div><div ref={menu} id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} inert={!open} aria-hidden={!open}><nav aria-label="Мобильная навигация">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}<span aria-hidden="true">↗</span></Link>)}</nav><TrialButton className="button" source="header" onOpen={() => setOpen(false)}>Попробовать</TrialButton></div></header>;
}

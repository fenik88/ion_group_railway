"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Send } from "lucide-react"
import { useLanguage } from "@/lib/language-context"



export function MainContent() {
  const { language, setLanguage, t } = useLanguage()
  const [navVisible, setNavVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setNavVisible(window.scrollY > window.innerHeight)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { key: "services", label: t.nav.services },
    { key: "cases", label: t.nav.cases },
    { key: "process", label: t.nav.process },
    { key: "faq", label: t.nav.faq },
  ]

  const stats = [
    { value: "20+", label: t.stats.projects },
    { value: "$1,000,000", label: t.stats.raised },
    { value: "1.2M", label: t.stats.community },
  ]

  return (
    <div style={{ backgroundColor: "#0A0A0A" }}>

      {/* FIXED NAV - appears after scrolling past hero */}
      <nav
        className="flex justify-between items-center px-6 md:px-12 py-[18px] border-b border-border/50 transition-opacity duration-300"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: "#0A0A0A",
          borderBottom: "0.5px solid #1A1A1A",
          opacity: navVisible ? 1 : 0,
          pointerEvents: navVisible ? "auto" : "none",
        }}
      >
        <Link href="#hero" className="text-sm font-medium tracking-tight hover:text-accent transition-colors">ION GROUP</Link>
        <div className="hidden md:flex gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.key}
              href={`#${l.key}`}
              className="text-[12px] text-muted-foreground uppercase tracking-[2.5px] hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLanguage(language === "en" ? "ru" : "en")}
            className="text-[12px] text-muted-foreground uppercase tracking-[2px] hover:text-foreground transition-colors"
          >
            <span className={language === "ru" ? "text-foreground" : ""}>RU</span>
            <span className="mx-1">/</span>
            <span className={language === "en" ? "text-foreground" : ""}>EN</span>
          </button>
          <Link
            href="#contact"
            className="text-[12px] text-foreground uppercase tracking-[2px] border border-accent px-4 py-2 rounded hover:bg-accent transition-colors"
          >
            {t.nav.contact}
          </Link>
        </div>
      </nav>

      {/* HERO TEXT */}
      <section id="hero" className="px-6 md:px-12 pt-24 pb-18">
        <div className="text-[10px] text-[#5A5A5A] tracking-[3px] uppercase mb-6">{t.hero.tagline}</div>
        <h1 className="text-4xl md:text-6xl font-medium leading-[1.1] tracking-tight mb-6 max-w-[640px] text-balance">
          {t.hero.title1}
          <br />
          <span className="text-accent">{t.hero.title2}</span>
        </h1>
        <p className="text-[13px] text-muted-foreground leading-relaxed max-w-[340px] mb-10">
          {t.hero.description}
        </p>
        <div className="flex gap-4 items-center flex-wrap">
          <Link
            href="#contact"
            className="bg-primary text-primary-foreground text-[10px] font-medium px-6 py-3 rounded tracking-[2px] uppercase hover:opacity-90 transition-opacity"
          >
            {t.hero.cta}
          </Link>
          <Link
            href="#cases"
            className="text-[10px] text-[#5A5A5A] tracking-[2px] uppercase hover:text-foreground transition-colors"
          >
            {t.hero.ctaSecondary}
          </Link>
        </div>
      </section>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-border">
        {stats.map(({ value, label }) => (
          <div key={label} className="px-6 md:px-12 py-7 border-b md:border-b-0 md:border-r border-border last:border-r-0 last:border-b-0">
            <div className="text-[28px] font-medium">{value}</div>
            <div className="text-[9px] text-accent uppercase tracking-[2px] mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* SERVICES */}
      <section id="services" className="px-6 md:px-12 pt-18">
        <div className="text-[9px] text-accent tracking-[3px] uppercase mb-8">{t.services.label}</div>
        <h2 className="text-[32px] font-medium tracking-tight mb-4 text-balance">
          {t.services.title}<br />{t.services.titleBreak}
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-[400px] mb-12">
          {t.services.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border">
          {t.services.items.map(({ num, title, desc }) => (
            <div key={num} className="px-6 md:px-10 py-9 border-r border-b border-border">
              <div className="text-[9px] text-[#555] tracking-[2px] mb-3">{num}</div>
              <div className="text-[15px] font-medium mb-2">{title}</div>
              <div className="text-[13px] text-[#5A5A5A] leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="px-6 md:px-12 pt-18">
        <div className="text-[9px] text-accent tracking-[3px] uppercase mb-8">{t.cases.label}</div>
        <h2 className="text-[32px] font-medium tracking-tight mb-12">{t.cases.title}</h2>
        <div className="border-t border-border">
          {t.cases.items.map(({ name, tag, stat, desc }) => (
            <div key={name} className="flex justify-between items-center py-6 border-b border-border">
              <div>
                <div className="text-sm font-medium">{name}</div>
                <div className="text-[10px] text-accent uppercase tracking-[2px] mt-1">{tag}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-medium">{stat}</div>
                <div className="text-[13px] text-[#5A5A5A] mt-0.5">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="px-6 md:px-12 pt-18">
        <div className="text-[9px] text-accent tracking-[3px] uppercase mb-8">{t.process.label}</div>
        <h2 className="text-[32px] font-medium tracking-tight mb-12 text-balance">
          {t.process.title}<br />{t.process.titleBreak}
        </h2>
        <div className="border-t border-border">
          {t.process.items.map(({ num, title, desc }) => (
            <div key={num} className="flex gap-6 py-6 border-b border-border">
              <div className="text-[10px] text-[#555] tracking-[2px] min-w-[28px] pt-0.5">{num}</div>
              <div>
                <div className="text-sm font-medium mb-1.5">{title}</div>
                <div className="text-[13px] text-[#5A5A5A] leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 md:px-12 pt-18">
        <div className="text-[9px] text-accent tracking-[3px] uppercase mb-8">{t.faq.label}</div>
        <h2 className="text-[32px] font-medium tracking-tight mb-12">{t.faq.title}</h2>
        <div className="border-t border-border">
          {t.faq.items.map(({ q, a }) => (
            <div key={q} className="py-6 border-b border-border">
              <div className="text-[13px] font-medium mb-2">{q}</div>
              <div className="text-[13px] text-[#5A5A5A] leading-relaxed">{a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 md:px-12 py-24">
        <div className="text-[9px] text-accent tracking-[3px] uppercase mb-8">{t.contact.label}</div>
        <h2 className="text-[40px] font-medium tracking-tight mb-4">{t.contact.title}</h2>
        <p className="text-xs text-muted-foreground leading-relaxed mb-10">
          {t.contact.description}
        </p>
        <Link
          href="https://t.me/ion_contact"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-[10px] font-medium px-6 py-3 rounded tracking-[2px] uppercase hover:opacity-90 transition-opacity"
        >
          <Send className="w-4 h-4" />
          Message
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 md:px-12 py-6 border-t border-border">
        <Link href="#hero" className="text-[13px] font-medium hover:text-accent transition-colors">ION GROUP</Link>
        <div className="flex gap-6">
          <Link href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-[12px] text-accent uppercase tracking-[2px] hover:text-foreground transition-colors">
            X
          </Link>
          <Link href="https://t.me/iongroup_agency" target="_blank" rel="noopener noreferrer" className="text-[12px] text-accent uppercase tracking-[2px] hover:text-foreground transition-colors">
            Telegram
          </Link>
        </div>
        <div className="text-[10px] text-[#555]">{t.footer.copyright}</div>
      </footer>

    </div>
  )
}

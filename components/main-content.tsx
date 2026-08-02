"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Send } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { Reveal } from "@/components/reveal"
import { CountUp } from "@/components/count-up"

// Small square that echoes the "." in ION.GROUP — used as a section marker.
function Dot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block w-[5px] h-[5px] rounded-full bg-current align-middle mr-2.5 ${className}`}
    />
  )
}

export function MainContent() {
  const { language, setLanguage, t } = useLanguage()
  const [navVisible, setNavVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setNavVisible(window.scrollY > window.innerHeight)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
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
        className="flex justify-between items-center px-6 md:px-12 py-[18px] transition-opacity duration-300"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: "rgba(10,10,10,0.72)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "0.5px solid #262626",
          opacity: navVisible ? 1 : 0,
          pointerEvents: navVisible ? "auto" : "none",
        }}
      >
        <Link href="#hero" className="text-[19px] font-medium tracking-tight hover:text-accent transition-colors">ION GROUP</Link>
        <div className="hidden md:flex gap-10">
          {navLinks.map((l) => (
            <Link
              key={l.key}
              href={`#${l.key}`}
              className="text-[16px] text-muted-foreground uppercase tracking-[2px] hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={() => setLanguage(language === "en" ? "ru" : "en")}
            className="text-[16px] text-muted-foreground uppercase tracking-[2px] hover:text-foreground transition-colors"
          >
            <span className={language === "ru" ? "text-foreground" : ""}>RU</span>
            <span className="mx-1">/</span>
            <span className={language === "en" ? "text-foreground" : ""}>EN</span>
          </button>
          <Link
            href="#contact"
            className="text-[16px] text-foreground uppercase tracking-[2px] border border-accent px-6 py-3 rounded hover:bg-accent hover:text-background transition-colors"
          >
            {t.nav.contact}
          </Link>
        </div>
      </nav>

      {/* HERO TEXT */}
      <section id="hero" className="px-6 md:px-12 pt-24 md:pt-28 pb-20">
        <Reveal>
          <div className="text-[13px] text-[#8C8C8C] tracking-[2px] uppercase mb-6 flex items-center">
            <Dot /> {t.hero.tagline}
          </div>
          <h1 className="text-[44px] md:text-[92px] font-medium leading-[1.02] tracking-[-0.02em] mb-8 max-w-[900px] text-balance">
            {t.hero.title1}
            <br />
            <span className="text-foreground">{t.hero.title2}</span>
          </h1>
          <p className="text-[17px] md:text-[18px] text-[#B8B8B8] leading-relaxed max-w-[420px] mb-10">
            {t.hero.description}
          </p>
          <div className="flex gap-5 items-center flex-wrap">
            <Link
              href="#contact"
              className="bg-primary text-primary-foreground text-[12px] font-medium px-8 py-4 rounded tracking-[2px] uppercase hover:opacity-90 transition-opacity"
            >
              {t.hero.cta}
            </Link>
            <Link
              href="#cases"
              className="text-[12px] text-[#A6A6A6] tracking-[2px] uppercase hover:text-foreground transition-colors"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </Reveal>
      </section>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-border">
        {stats.map(({ value, label }, i) => (
          <Reveal
            key={label}
            delay={i * 90}
            className="px-6 md:px-12 py-10 border-b md:border-b-0 md:border-r border-border last:border-r-0 last:border-b-0"
          >
            <div className="text-[46px] md:text-[64px] font-medium leading-none tracking-[-0.02em]">
              <CountUp value={value} />
            </div>
            <div className="text-[12px] text-accent uppercase tracking-[2px] mt-3">{label}</div>
          </Reveal>
        ))}
      </div>

      {/* SERVICES */}
      <section id="services" className="px-6 md:px-12 pt-20 md:pt-28">
        <Reveal>
          <div className="text-[13px] text-accent tracking-[2px] uppercase mb-8 flex items-center"><Dot />{t.services.label}</div>
          <h2 className="text-[40px] md:text-[56px] font-medium tracking-[-0.02em] leading-[1.02] mb-4 text-balance">
            {t.services.title}<br />{t.services.titleBreak}
          </h2>
          <p className="text-[16px] md:text-[17px] text-[#B8B8B8] leading-relaxed max-w-[440px] mb-12">
            {t.services.description}
          </p>
        </Reveal>
        <Reveal className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border">
          {t.services.items.map(({ num, title, desc }) => (
            <div key={num} className="px-6 md:px-10 py-10 border-r border-b border-border">
              <div className="text-[12px] text-accent tracking-[2px] mb-4 flex items-center"><Dot />{num}</div>
              <div className="text-[22px] md:text-[24px] font-medium mb-3">{title}</div>
              <div className="text-[16px] text-[#B8B8B8] leading-relaxed">{desc}</div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* CASES */}
      <section id="cases" className="px-6 md:px-12 pt-20 md:pt-28">
        <Reveal>
          <div className="text-[13px] text-accent tracking-[2px] uppercase mb-8 flex items-center"><Dot />{t.cases.label}</div>
          <h2 className="text-[40px] md:text-[56px] font-medium tracking-[-0.02em] leading-[1.02] mb-12">{t.cases.title}</h2>
        </Reveal>
        <Reveal className="border-t border-border">
          {t.cases.items.map(({ name, tag, stat, desc }) => (
            <div
              key={name}
              className="group flex justify-between items-center gap-4 px-4 -mx-4 py-7 border-b border-border rounded-sm transition-colors duration-300 hover:bg-[#F0EDE8]"
            >
              <div>
                <div className="text-[18px] md:text-[20px] font-medium transition-colors duration-300 group-hover:text-[#0A0A0A]">{name}</div>
                <div className="text-[13px] text-accent uppercase tracking-[2px] mt-1.5 transition-colors duration-300 group-hover:text-[#3A3A3A]">{tag}</div>
              </div>
              <div className="text-right">
                <div className="text-[26px] md:text-[32px] font-medium leading-none tracking-[-0.01em] transition-colors duration-300 group-hover:text-[#0A0A0A]">{stat}</div>
                <div className="text-[15px] text-[#B8B8B8] mt-1.5 transition-colors duration-300 group-hover:text-[#3A3A3A]">{desc}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* FULL-BLEED STATEMENT — visual breath between cases and process */}
      <section className="px-6 md:px-12 py-24 md:py-40 mt-4">
        <Reveal>
          <p className="text-[38px] md:text-[80px] font-medium leading-[1.02] tracking-[-0.02em] max-w-[1000px] text-balance">
            {t.hero.title1} <span className="text-[#6A6A6A]">{t.hero.title2}</span>
          </p>
        </Reveal>
      </section>

      {/* PROCESS */}
      <section id="process" className="px-6 md:px-12 pt-4">
        <Reveal>
          <div className="text-[13px] text-accent tracking-[2px] uppercase mb-8 flex items-center"><Dot />{t.process.label}</div>
          <h2 className="text-[40px] md:text-[56px] font-medium tracking-[-0.02em] leading-[1.02] mb-12 text-balance">
            {t.process.title}<br />{t.process.titleBreak}
          </h2>
        </Reveal>
        <Reveal className="border-t border-border">
          {t.process.items.map(({ num, title, desc }) => (
            <div key={num} className="flex gap-6 py-7 border-b border-border">
              <div className="text-[14px] text-accent tracking-[2px] min-w-[32px] pt-1.5 font-medium">{num}</div>
              <div>
                <div className="text-[18px] md:text-[20px] font-medium mb-2">{title}</div>
                <div className="text-[16px] text-[#B8B8B8] leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 md:px-12 pt-20 md:pt-28">
        <Reveal>
          <div className="text-[13px] text-accent tracking-[2px] uppercase mb-8 flex items-center"><Dot />{t.faq.label}</div>
          <h2 className="text-[40px] md:text-[56px] font-medium tracking-[-0.02em] leading-[1.02] mb-12">{t.faq.title}</h2>
        </Reveal>
        <Reveal className="border-t border-border">
          {t.faq.items.map(({ q, a }) => (
            <div key={q} className="py-7 border-b border-border">
              <div className="text-[20px] md:text-[22px] font-medium mb-2.5">{q}</div>
              <div className="text-[16px] text-[#B8B8B8] leading-relaxed max-w-[640px]">{a}</div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 md:px-12 py-28 md:py-36">
        <Reveal>
          <div className="text-[13px] text-accent tracking-[2px] uppercase mb-8 flex items-center"><Dot />{t.contact.label}</div>
          <h2 className="text-[56px] md:text-[76px] font-medium tracking-[-0.02em] leading-[1.0] mb-6">{t.contact.title}</h2>
          <p className="text-[16px] md:text-[17px] text-[#B8B8B8] leading-relaxed mb-10 max-w-[440px]">
            {t.contact.description}
          </p>
          <Link
            href="https://t.me/ion_contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-[12px] font-medium px-8 py-4 rounded tracking-[2px] uppercase hover:opacity-90 transition-opacity"
          >
            <Send className="w-4 h-4" />
            Message
          </Link>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="flex flex-col md:flex-row justify-between items-center gap-6 px-6 md:px-12 py-16 border-t border-border">
        <Link href="#hero" className="text-[18px] font-medium hover:text-accent transition-colors">ION GROUP</Link>
        <div className="flex gap-10">
          <Link href="https://t.me/iongroup_agency" target="_blank" rel="noopener noreferrer" className="text-[22px] text-accent uppercase tracking-[2px] hover:text-foreground transition-colors">
            Telegram
          </Link>
        </div>
        <div className="text-[14px] text-[#7A7A7A]">{t.footer.copyright}</div>
      </footer>

    </div>
  )
}

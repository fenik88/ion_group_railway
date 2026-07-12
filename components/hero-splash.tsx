"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"

export function HeroSplash() {
  const [opacity, setOpacity] = useState(1)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const newOpacity = Math.max(0, 1 - scrollY / (viewportHeight * 0.6))
      setOpacity(newOpacity)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        zIndex: 0,
        overflow: "hidden",
        backgroundColor: "#0A0A0A",
      }}
    >
      <div
        style={{ opacity, transition: "opacity 0.1s ease-out" }}
        className="flex flex-col items-center justify-center h-full px-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          ION<span className="text-[#555555]">.</span>GROUP
        </h1>
        <p className="text-[10px] text-[#555555] uppercase tracking-[6px] mt-4">
          {t.splash.tagline}
        </p>
        <div className="w-12 h-px bg-[#555555] mt-8 mb-8" />
        <p className="text-sm text-[#5A5A5A] text-center leading-relaxed">
          {t.splash.line1}
        </p>
        <p className="text-sm text-[#5A5A5A] text-center leading-relaxed">
          {t.splash.line2}
        </p>
      </div>
      <div
        className="absolute bottom-0 left-0 w-full h-[200px] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #0A0A0A)",
        }}
      />
    </section>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  value: string
  className?: string
}

/**
 * Animates a numeric value up from zero when scrolled into view, preserving any
 * prefix/suffix (e.g. "$1,000,000", "1.2M", "20+"). On mid-size screens
 * (765px < width <= 1220px) large numbers are abbreviated to K/M
 * (e.g. "$1,000,000" -> "$1.0M"). Falls back to the raw string if the value
 * can't be parsed, so it can never break the layout.
 */
export function CountUp({ value, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)
  const started = useRef(false)
  const currentValueRef = useRef(0)
  const widthRef = useRef(typeof window !== "undefined" ? window.innerWidth : Infinity)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const match = value.match(/^(\D*)([\d.,]+)(\D*)$/)
    if (!match) {
      setDisplay(value)
      return
    }

    const prefix = match[1] ?? ""
    const numStr = match[2] ?? ""
    const suffix = match[3] ?? ""
    const hasComma = numStr.includes(",")
    const clean = numStr.replace(/,/g, "")
    const decimals = clean.includes(".") ? (clean.split(".")[1]?.length ?? 0) : 0
    const target = parseFloat(clean)

    if (Number.isNaN(target)) {
      setDisplay(value)
      return
    }

    const format = (n: number) => {
      const width = widthRef.current
      if (width > 765 && width <= 1220) {
        if (n >= 1e6) return prefix + (n / 1e6).toFixed(1) + "M" + suffix
        if (n >= 1e3) return prefix + (n / 1e3).toFixed(1) + "K" + suffix
      }

      let body: string
      if (hasComma) {
        body = n.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      } else {
        body = n.toFixed(decimals)
      }
      return prefix + body + suffix
    }

    currentValueRef.current = 0
    setDisplay(format(0))

    const handleResize = () => {
      widthRef.current = window.innerWidth
      setDisplay(format(currentValueRef.current))
    }
    window.addEventListener("resize", handleResize)

    if (typeof IntersectionObserver === "undefined") {
      currentValueRef.current = target
      setDisplay(format(target))
      return () => window.removeEventListener("resize", handleResize)
    }

    const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const duration = 1400
            const start = performance.now()
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration)
              const eased = 1 - Math.pow(1 - p, 3)
              currentValueRef.current = target * eased
              setDisplay(format(currentValueRef.current))
              if (p < 1) {
                requestAnimationFrame(tick)
              } else {
                currentValueRef.current = target
                setDisplay(format(target))
              }
            }
            requestAnimationFrame(tick)
            obs.disconnect()
          }
        },
        { threshold: 0.5 },
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      window.removeEventListener("resize", handleResize)
    }
  }, [value])

  return (
      <span ref={ref} className={className}>
      {display}
    </span>
  )
}
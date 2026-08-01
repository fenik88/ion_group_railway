"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  value: string
  className?: string
}

/**
 * Animates a numeric value up from zero when scrolled into view, preserving any
 * prefix/suffix (e.g. "$1,000,000", "1.2M", "20+"). Falls back to the raw string
 * if the value can't be parsed, so it can never break the layout.
 */
export function CountUp({ value, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)
  const started = useRef(false)

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

    setDisplay(format(0))

    if (typeof IntersectionObserver === "undefined") {
      setDisplay(format(target))
      return
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
            setDisplay(format(target * eased))
            if (p < 1) {
              requestAnimationFrame(tick)
            } else {
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
    return () => obs.disconnect()
  }, [value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}

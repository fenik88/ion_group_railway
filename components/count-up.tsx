
"use client"

import { useEffect, useState } from "react"

interface CountUpProps {
  value: string
  className?: string
}

export function CountUp({ value, className = "" }: CountUpProps) {
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const updateDisplay = () => {
      const width = window.innerWidth

      // Парсим число
      const match = value.match(/^(\D*)([\d.,]+)(\D*)$/)
      if (!match) {
        setDisplay(value)
        return
      }

      const prefix = match[1] ?? ""
      const numStr = match[2] ?? ""
      const suffix = match[3] ?? ""
      const clean = numStr.replace(/,/g, "")
      const num = parseFloat(clean)

      if (isNaN(num)) {
        setDisplay(value)
        return
      }

      // 1040px и меньше - показываем 1M
      if (width <= 1220 && width > 765) {
        if (num >= 1e6) {
          setDisplay(prefix + (num / 1e6).toFixed(1) + 'M' + suffix)
        } else if (num >= 1e3) {
          setDisplay(prefix + (num / 1e3).toFixed(1) + 'K' + suffix)
        } else {
          setDisplay(value)
        }
      } else {
        // В остальных случаях - полное число
        setDisplay(value)
      }
    }

    updateDisplay()
    window.addEventListener('resize', updateDisplay)
    return () => window.removeEventListener('resize', updateDisplay)
  }, [value])

  return <span className={className}>{display}</span>
}
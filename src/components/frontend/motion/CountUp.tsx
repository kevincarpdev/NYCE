'use client'

import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { theme } from '@/theme/theme'

const Figure = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.stat};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  color: inherit;
`

type CountUpProps = {
  value: number
  suffix?: string
}

const duration = Number.parseInt(theme.motion.count, 10)

const CountUpComponent = ({ value, suffix = '' }: CountUpProps) => {
  const [shown, setShown] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setShown(value)
      return
    }
    let frame = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - (1 - t) ** 3
          setShown(Math.round(value * eased))
          if (t < 1) frame = window.requestAnimationFrame(tick)
        }
        frame = window.requestAnimationFrame(tick)
      },
      { threshold: theme.observe.count },
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <Figure ref={ref}>
      {shown}
      {suffix}
    </Figure>
  )
}

export const CountUp = React.memo(CountUpComponent)
CountUp.displayName = 'CountUp'

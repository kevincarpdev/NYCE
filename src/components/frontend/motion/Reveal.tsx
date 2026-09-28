'use client'

import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { theme } from '@/theme/theme'

const Box = styled.div<{ $delay: number }>`
  --stagger: ${({ $delay }) => $delay};

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
  }
`

type RevealProps = {
  children: React.ReactNode
  delay?: number
}

const RevealComponent = ({ children, delay = 0 }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    document.documentElement.dataset.motion = 'on'
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      node.dataset.shown = 'true'
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.dataset.shown = 'true'
            observer.disconnect()
          }
        })
      },
      { threshold: theme.observe.reveal, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Box $delay={delay} data-reveal ref={ref}>
      {children}
    </Box>
  )
}

export const Reveal = React.memo(RevealComponent)
Reveal.displayName = 'Reveal'

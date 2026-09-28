'use client'

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Word = styled.span<{ $delay: number }>`
  --stagger: ${({ $delay }) => $delay};
`

type RevealTextProps = {
  text: string
  as?: 'h1' | 'h2' | 'p' | 'span'
}

const RevealTextComponent = ({ text, as: Tag = 'span' }: RevealTextProps) => {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.motion = 'on'
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const frame = window.requestAnimationFrame(() => setShown(true))
    if (reduce) setShown(true)
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const words = text.split(' ')

  return (
    <Tag>
      {words.map((word, index) => (
        <React.Fragment key={`${word}-${index}`}>
          <Word $delay={index} data-load data-shown={shown ? 'true' : 'false'}>
            {word}
          </Word>
          {index < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </Tag>
  )
}

export const RevealText = React.memo(RevealTextComponent)
RevealText.displayName = 'RevealText'

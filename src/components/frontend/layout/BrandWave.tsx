'use client'

import React from 'react'
import styled from 'styled-components'

const Wave = styled.div<{ $fill: 'canvas' | 'brand' }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${({ theme }) => theme.layout.curveHeight};
  background: ${({ theme, $fill }) =>
    $fill === 'brand' ? theme.colors.surface.brand : theme.colors.surface.canvas};
  clip-path: ${({ theme }) => theme.layout.curveClip};
  z-index: ${({ theme }) => theme.zIndex.overlay};
  pointer-events: none;
`

type BrandWaveProps = {
  fill?: 'canvas' | 'brand'
}

const BrandWaveComponent = ({ fill = 'canvas' }: BrandWaveProps) => <Wave $fill={fill} />

export const BrandWave = React.memo(BrandWaveComponent)
BrandWave.displayName = 'BrandWave'

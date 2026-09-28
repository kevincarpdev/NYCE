'use client'

import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

import { BrandWave } from '@/components/frontend/layout/BrandWave'
import { brandPhotos, hubCopy } from '@/lib/brand'
import { theme } from '@/theme/theme'

const Panel = styled.div`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  min-height: ${({ theme }) => theme.layout.authMobilePhoto};
  background: ${({ theme }) => theme.colors.surface.ink};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex: 1;
    min-height: 0;
  }
`

const Photo = styled(Image)`
  object-fit: cover;
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  background: linear-gradient(
    to top,
    ${({ theme }) => theme.colors.overlay.start},
    ${({ theme }) => theme.colors.overlay.mid},
    ${({ theme }) => theme.colors.overlay.end}
  );
`

const Copy = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    position: absolute;
    inset: 0;
    z-index: ${({ theme }) => theme.zIndex.content};
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: ${({ theme }) => theme.spacing(10)};
    padding-bottom: ${({ theme }) => theme.layout.curveHeight};
    color: ${({ theme }) => theme.colors.content.inverse};
  }
`

const Logo = styled.img`
  width: ${({ theme }) => `${theme.layout.logoWidthMobile}px`};
  height: auto;
  margin-bottom: ${({ theme }) => theme.spacing(5)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: ${({ theme }) => `${theme.layout.logoWidth}px`};
  }
`

const Eyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing(3)};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.surface.gold};
`

const Headline = styled.p`
  margin: 0;
  max-width: 16ch;
  font-size: ${({ theme }) => theme.typography.fontSizes.panel};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`

const Mission = styled.p`
  margin: ${({ theme }) => theme.spacing(4)} 0 0;
  max-width: 36ch;
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
`

const AuthPhotoPanelComponent = () => (
  <Panel>
    <Photo
      alt={brandPhotos.harbor.alt}
      fill
      priority
      sizes={`(min-width: ${theme.breakpoints.md}) 55vw, 100vw`}
      src={brandPhotos.harbor.src}
    />
    <Overlay />
    <Copy>
      <Logo alt="The New York Climate Exchange" src="/nyce-logo.png" />
      <Eyebrow>{hubCopy.eyebrow}</Eyebrow>
      <Headline>{hubCopy.headline}</Headline>
      <Mission>{hubCopy.mission}</Mission>
    </Copy>
    <BrandWave fill="canvas" />
  </Panel>
)

export const AuthPhotoPanel = React.memo(AuthPhotoPanelComponent)
AuthPhotoPanel.displayName = 'AuthPhotoPanel'

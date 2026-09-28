'use client'

import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

import { Sheet, Eyebrow, Gold } from '@/components/proposal/ProposalStyles'
import { BrandWave } from '@/components/frontend/layout/BrandWave'
import { brandPhotos } from '@/lib/brand'
import { proposal } from '@/lib/proposal'

const Photo = styled.div`
  position: relative;
  isolation: isolate;
  height: ${({ theme }) => theme.layout.featurePhoto};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface.ink};
  margin: ${({ theme }) => `-${theme.spacing(14)} -${theme.spacing(14)} 0`};
`

const Img = styled(Image)`
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

const Meta = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.content.muted};
`

const ProposalCoverComponent = () => (
  <Sheet>
    <Photo>
      <Img alt={brandPhotos.harbor.alt} fill sizes="100vw" src={brandPhotos.harbor.src} />
      <Overlay />
      <BrandWave fill="brand" />
    </Photo>
    <Eyebrow>{proposal.client}</Eyebrow>
    <h1>Knowledge Hub</h1>
    <p>
      A library where professors and students leave climate-tech research they are not taking
      forward, so next semester can find it.
    </p>
    <Gold>
      <strong>Prepared for {proposal.preparedFor}</strong>
      <span>{proposal.date}</span>
      <span>{proposal.demo}</span>
    </Gold>
    <Meta>
      Prepared by {proposal.preparedBy}. A walkthrough of the approach, with a working prototype.
    </Meta>
  </Sheet>
)

export const ProposalCover = React.memo(ProposalCoverComponent)
ProposalCover.displayName = 'ProposalCover'

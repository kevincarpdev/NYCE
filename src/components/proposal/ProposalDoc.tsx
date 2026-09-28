'use client'

import React from 'react'
import { createGlobalStyle } from 'styled-components'
import styled from 'styled-components'

import { ProposalAccept } from '@/components/proposal/ProposalAccept'
import { ProposalAppendix } from '@/components/proposal/ProposalAppendix'
import { ProposalCover } from '@/components/proposal/ProposalCover'
import { ProposalGlance } from '@/components/proposal/ProposalGlance'
import { ProposalInvestment } from '@/components/proposal/ProposalInvestment'
import { ProposalMap } from '@/components/proposal/ProposalMap'
import { ProposalPrivacy } from '@/components/proposal/ProposalPrivacy'
import { ProposalScope } from '@/components/proposal/ProposalScope'
import { ProposalTimeline } from '@/components/proposal/ProposalTimeline'
import { ProposalWork } from '@/components/proposal/ProposalWork'

const PrintRules = createGlobalStyle`
  @page {
    size: letter;
    margin: 0;
  }

  @media print {
    html,
    body {
      background: ${({ theme }) => theme.colors.surface.raised};
    }
  }
`

const Print = styled.div`
  background: ${({ theme }) => theme.colors.surface.paper};

  @media print {
    background: ${({ theme }) => theme.colors.surface.raised};
  }
`

type ProposalDocProps = {
  shots: { src: string; caption: string }[]
}

const ProposalDocComponent = ({ shots }: ProposalDocProps) => (
  <Print data-proposal="true">
    <PrintRules />
    <ProposalCover />
    <ProposalGlance />
    <ProposalMap />
    <ProposalWork />
    <ProposalTimeline />
    <ProposalScope />
    <ProposalInvestment />
    <ProposalPrivacy />
    <ProposalAccept />
    <ProposalAppendix shots={shots} />
  </Print>
)

export const ProposalDoc = React.memo(ProposalDocComponent)
ProposalDoc.displayName = 'ProposalDoc'

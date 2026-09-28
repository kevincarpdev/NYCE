'use client'

import React from 'react'
import styled from 'styled-components'

import { PageSection, SectionWrapper } from '@/components/frontend/layout/Containers'
import { Reveal } from '@/components/frontend/motion/Reveal'
import { faqs } from '@/lib/content'

const Intro = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
  max-width: 40rem;
`

const List = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`

const Item = styled.details`
  background: ${({ theme }) => theme.colors.surface.raised};
  padding: ${({ theme }) => theme.spacing(6)};
`

const Question = styled.summary`
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
`

const Answer = styled.p`
  margin: ${({ theme }) => theme.spacing(4)} 0 0;
  max-width: 52rem;
`

const FaqPageComponent = () => (
  <PageSection tone="paper">
    <SectionWrapper>
      <Reveal>
        <Intro>
          <h1>FAQ</h1>
          <p>Answers from the posting, the emails, and the call. Sample content only.</p>
        </Intro>
      </Reveal>
      <List>
        {faqs.map((item, index) => (
          <Reveal delay={index} key={item.q}>
            <Item>
              <Question>{item.q}</Question>
              <Answer>{item.a}</Answer>
            </Item>
          </Reveal>
        ))}
      </List>
    </SectionWrapper>
  </PageSection>
)

export const FaqPage = React.memo(FaqPageComponent)
FaqPage.displayName = 'FaqPage'

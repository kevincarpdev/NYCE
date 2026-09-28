'use client'

import React from 'react'
import styled from 'styled-components'

import { Button } from '@/components/frontend/ui/Button'
import { PageSection, SectionWrapper } from '@/components/frontend/layout/Containers'
import { Reveal } from '@/components/frontend/motion/Reveal'

const Title = styled.h1`
  margin: 0;
  max-width: 18ch;
`

const Lead = styled.p`
  margin: 0;
  max-width: 40rem;
  font-size: ${({ theme }) => theme.typography.fontSizes.lead};
`

const List = styled.ol`
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing(6)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(6)};
  max-width: 46rem;
  font-size: ${({ theme }) => theme.typography.fontSizes.body};
`

const Item = styled.li`
  padding-left: ${({ theme }) => theme.spacing(2)};
`

const WalkthroughStepsComponent = () => (
  <PageSection tone="raised">
    <SectionWrapper>
      <Reveal>
        <Title>How to look at this</Title>
      </Reveal>
      <Reveal delay={1}>
        <Lead>
          Five minutes. This is a walkthrough of the approach, not the finished library. Sample
          research only.
        </Lead>
      </Reveal>
      <Reveal delay={2}>
        <List>
          <Item>
            Open <strong>Water and coasts</strong> in the library. Start with{' '}
            <em>Leaving the reef to breathe</em>.
          </Item>
          <Item>Read the memo. Attribution and the agreement date sit on the page with the file.</Item>
          <Item>
            Stay logged out and open <em>Term sheet language we were handed</em>. You will see that
            it exists. You will not get the body or the file.
          </Item>
          <Item>Sign in as Amina Ruiz, submit leftover research, then open My submissions.</Item>
          <Item>
            Sign in as Amina, open Charging at the ferry slip, then Open workspace. Leave a note.
            Ask the assistant to tighten the summary. Accept the suggested edit.
          </Item>
          <Item>
            Open the same leftover as Dr. Priya Raman in another window. You should both show on the
            leftover. If you save at the same time, Payload keeps the first version.
          </Item>
          <Item>
            Sign in as Jordan Ellis, open the Payload admin, publish or send back, then refresh the
            library.
          </Item>
        </List>
      </Reveal>
      <Reveal delay={3}>
        <Button href="/library?topic=water-and-coasts" size="lg" variant="gold">
          Start with Water and coasts
        </Button>
      </Reveal>
    </SectionWrapper>
  </PageSection>
)

export const WalkthroughSteps = React.memo(WalkthroughStepsComponent)
WalkthroughSteps.displayName = 'WalkthroughSteps'

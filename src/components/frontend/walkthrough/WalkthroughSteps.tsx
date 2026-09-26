'use client'

import React from 'react'
import styled from 'styled-components'

import { Button } from '@/components/frontend/ui/Button'
import { PageSection, SectionWrapper } from '@/components/frontend/layout/Containers'

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.xxl};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
`

const List = styled.ol`
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing(6)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(5)};
`

const Item = styled.li`
  padding-left: ${({ theme }) => theme.spacing(2)};
`

const WalkthroughStepsComponent = () => (
  <PageSection>
    <SectionWrapper>
      <Title>How to look at this</Title>
      <p>
        Five minutes. This is a walkthrough of the approach, not the finished library. Sample
        research only.
      </p>
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
        <Item>
          Sign in as Amina Ruiz, submit leftover research, then open My submissions.
        </Item>
        <Item>
          Sign in as Jordan Ellis, open the Payload admin, publish or send back, then refresh the
          library.
        </Item>
      </List>
      <Button href="/library?topic=water-and-coasts">Start with Water and coasts</Button>
    </SectionWrapper>
  </PageSection>
)

export const WalkthroughSteps = React.memo(WalkthroughStepsComponent)
WalkthroughSteps.displayName = 'WalkthroughSteps'

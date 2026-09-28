'use client'

import React from 'react'
import styled from 'styled-components'

import { PageSection, SectionWrapper } from '@/components/frontend/layout/Containers'
import { Reveal } from '@/components/frontend/motion/Reveal'
import { Button } from '@/components/frontend/ui/Button'
import { guidelines } from '@/lib/content'

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(10)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Card = styled.article`
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
  align-content: start;
`

const List = styled.ul`
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing(5)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
`

const Intro = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(5)};
  max-width: 42rem;
`

const GuidelinesPageComponent = () => (
  <>
    <PageSection tone="brand">
      <SectionWrapper>
        <Reveal>
          <Intro>
            <h1>What to leave behind</h1>
            <p>
              Work you developed and do not intend to take forward. Next semester should be able to
              find it and use it.
            </p>
          </Intro>
        </Reveal>
      </SectionWrapper>
    </PageSection>
    <PageSection tone="raised">
      <Grid>
        <Reveal>
          <Card>
            <h2>Send this</h2>
            <List>
              {guidelines.include.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </List>
          </Card>
        </Reveal>
        <Reveal delay={1}>
          <Card>
            <h2>Keep this out</h2>
            <List>
              {guidelines.exclude.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </List>
          </Card>
        </Reveal>
        <Reveal delay={2}>
          <Card>
            <h2>Review</h2>
            <List>
              {guidelines.review.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </List>
          </Card>
        </Reveal>
      </Grid>
    </PageSection>
    <PageSection tone="paper">
      <SectionWrapper>
        <Reveal>
          <Intro>
            <h2>Agree, then send</h2>
            <p>
              The submit form includes a draft IP and attribution step. A record of who agreed and
              when sits on the leftover. The Exchange writes the final legal text in Month 1.
            </p>
            <Button href="/submit" size="lg" variant="gold">
              Send work in
            </Button>
          </Intro>
        </Reveal>
      </SectionWrapper>
    </PageSection>
  </>
)

export const GuidelinesPage = React.memo(GuidelinesPageComponent)
GuidelinesPage.displayName = 'GuidelinesPage'

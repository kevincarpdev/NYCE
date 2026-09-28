'use client'

import React from 'react'
import styled from 'styled-components'

import { PageSection, SectionWrapper } from '@/components/frontend/layout/Containers'
import { Reveal } from '@/components/frontend/motion/Reveal'
import { Button } from '@/components/frontend/ui/Button'
import { brandPhotos, exchangeLinks } from '@/lib/brand'

const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(10)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: start;
  }
`

const Copy = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(5)};
  justify-items: start;
`

const Quiet = styled.a`
  color: ${({ theme }) => theme.colors.surface.gold};
  text-decoration: underline;
  text-underline-offset: ${({ theme }) => theme.spacing(1)};
`

const Photo = styled.img`
  width: 100%;
  height: ${({ theme }) => theme.layout.featurePhoto};
  object-fit: cover;
`

const AboutPageComponent = () => (
  <>
    <PageSection tone="brand">
      <SectionWrapper>
        <Reveal>
          <Copy>
            <h1>A hub beside The Exchange</h1>
            <p>
              Professors and students leave climate-tech research they are not taking forward. Next
              semester’s students and aspiring founders can find it. Ownership and attribution stay
              on the record.
            </p>
          </Copy>
        </Reveal>
      </SectionWrapper>
    </PageSection>
    <PageSection tone="raised">
      <Layout>
        <Reveal>
          <Copy>
            <h2>Why it exists</h2>
            <p>
              This is not an internal tool for The Exchange team. It is a focused library for people
              who are building climate-tech startups at universities. Submit. Classify. Find.
            </p>
            <p>
              The hub sits next to{' '}
              <Quiet href={exchangeLinks.site} rel="noreferrer" target="_blank">
                nyce.org
              </Quiet>
              . It is not a rebuild of the public site.
            </p>
            <Button href="/library" size="lg" variant="gold">
              Browse leftovers
            </Button>
          </Copy>
        </Reveal>
        <Reveal delay={1}>
          <Photo alt={brandPhotos.campusAerial.alt} src={brandPhotos.campusAerial.src} />
        </Reveal>
      </Layout>
    </PageSection>
    <PageSection tone="paper">
      <SectionWrapper>
        <Reveal>
          <Copy>
            <h2>The pilot</h2>
            <p>
              Month 1 locks what is in and out, the taxonomy, and the agreement language. The
              working prototype is already here so you can react to a real thing. Live leftovers by
              mid-December, so spring students can find what the fall left behind.
            </p>
          </Copy>
        </Reveal>
      </SectionWrapper>
    </PageSection>
  </>
)

export const AboutPage = React.memo(AboutPageComponent)
AboutPage.displayName = 'AboutPage'

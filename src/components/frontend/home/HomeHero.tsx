'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MagnifyingGlass } from '@phosphor-icons/react'
import styled, { keyframes } from 'styled-components'

import { Button } from '@/components/frontend/ui/Button'
import { BrandWave } from '@/components/frontend/layout/BrandWave'
import { BaseContainer } from '@/components/frontend/layout/Containers'
import { RevealText } from '@/components/frontend/motion/RevealText'
import { brandPhotos } from '@/lib/brand'
import type { TopicCard } from '@/lib/queries'
import { libraryHref } from '@/lib/libraryHref'
import { theme } from '@/theme/theme'

const drift = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(${theme.layout.heroZoom});
  }
`

const Hero = styled.section`
  background: ${({ theme }) => theme.colors.surface.brand};
  color: ${({ theme }) => theme.colors.content.inverse};
`

const PhotoBand = styled.div`
  position: relative;
  isolation: isolate;
  height: ${({ theme }) => theme.layout.authMobilePhoto};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface.ink};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: ${({ theme }) => theme.layout.heroPhotoHeight};
  }
`

const Photo = styled(Image)`
  object-fit: cover;
  animation: ${drift} ${({ theme }) => theme.motion.zoom} ${({ theme }) => theme.motion.easing}
    alternate infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
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

const Body = styled.div`
  padding-block: ${({ theme }) => theme.spacing(20)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => theme.spacing(28)};
  }
`

const Eyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing(4)};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.surface.gold};
`

const Title = styled.h1`
  margin: 0;
  max-width: 18ch;
  font-size: ${({ theme }) => theme.typography.fontSizes.hero};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`

const Lead = styled.p`
  margin: ${({ theme }) => theme.spacing(6)} 0 0;
  max-width: 42rem;
  font-size: ${({ theme }) => theme.typography.fontSizes.lead};
`

const Tools = styled.form`
  margin-top: ${({ theme }) => theme.spacing(10)};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(3)};
`

const Search = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.surface.raised};
  color: ${({ theme }) => theme.colors.content.primary};
  padding: ${({ theme }) => `${theme.spacing(4)} ${theme.spacing(5)}`};
  flex: 1 1 ${({ theme }) => theme.spacing(50)};
  transition: box-shadow ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out};

  &:hover,
  &:focus-within {
    box-shadow: 0 0 0 ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.colors.surface.gold};
  }
`

const Input = styled.input`
  border: 0;
  width: 100%;
  background: transparent;
  color: inherit;
  font-size: ${({ theme }) => theme.typography.fontSizes.body};

  &:focus {
    outline: none;
  }
`

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(8)};
`

const Chip = styled(Link)`
  color: ${({ theme }) => theme.colors.surface.gold};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  text-underline-offset: ${({ theme }) => theme.spacing(1)};
  transition: color ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out};

  &:hover {
    color: ${({ theme }) => theme.colors.content.inverse};
    text-decoration: underline;
  }
`

type HeroProps = {
  topics: TopicCard[]
}

const HomeHeroComponent = ({ topics }: HeroProps) => (
  <Hero>
    <PhotoBand>
      <Photo
        alt={brandPhotos.harbor.alt}
        fill
        priority
        sizes="100vw"
        src={brandPhotos.harbor.src}
      />
      <Overlay />
      <BrandWave fill="brand" />
    </PhotoBand>
    <Body>
      <BaseContainer>
        <Eyebrow>The New York Climate Exchange</Eyebrow>
        <Title>
          <RevealText as="span" text="Leave the work you are not taking forward." />
        </Title>
        <Lead>
          Professors and students building climate-tech startups send in research they will not take
          forward. Next semester can find it. Ownership and attribution stay on the record.
        </Lead>
        <Tools action="/library" method="get">
          <Search>
            <MagnifyingGlass size={theme.icons.md} />
            <Input name="q" placeholder="Search leftover research" />
          </Search>
          <Button size="lg" type="submit" variant="gold">
            Search the library
            <ArrowRight size={theme.icons.md} />
          </Button>
        </Tools>
        <Chips>
          {topics.map((topic) => (
            <Chip href={libraryHref({ topic: topic.slug })} key={topic.slug}>
              {topic.title}
            </Chip>
          ))}
        </Chips>
      </BaseContainer>
    </Body>
  </Hero>
)

export const HomeHero = React.memo(HomeHeroComponent)
HomeHero.displayName = 'HomeHero'

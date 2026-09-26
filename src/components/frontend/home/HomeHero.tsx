'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, MagnifyingGlass } from '@phosphor-icons/react'
import styled from 'styled-components'

import { Button } from '@/components/frontend/ui/Button'
import { BaseContainer } from '@/components/frontend/layout/Containers'
import type { TopicCard } from '@/lib/queries'
import { libraryHref } from '@/lib/libraryHref'
import { theme } from '@/theme/theme'

const Hero = styled.section`
  background: ${({ theme }) => theme.colors.surface.brand};
  color: ${({ theme }) => theme.colors.content.inverse};
  padding-block: ${({ theme }) => theme.spacing(16)};
`

const Eyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing(4)};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.surface.gold};
`

const Title = styled.h1`
  margin: 0;
  max-width: 18ch;
  font-size: ${({ theme }) => theme.typography.fontSizes.display};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
`

const Lead = styled.p`
  margin: ${({ theme }) => theme.spacing(6)} 0 0;
  max-width: 42rem;
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
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
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(4)}`};
  flex: 1 1 ${({ theme }) => theme.spacing(50)};
`

const Input = styled.input`
  border: 0;
  width: 100%;
  background: transparent;
  color: inherit;
`

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(6)};
`

const Chip = styled(Link)`
  color: ${({ theme }) => theme.colors.surface.gold};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`

type HeroProps = {
  topics: TopicCard[]
}

const HomeHeroComponent = ({ topics }: HeroProps) => (
  <Hero>
    <BaseContainer>
      <Eyebrow>The New York Climate Exchange</Eyebrow>
      <Title>Leave the work you are not taking forward.</Title>
      <Lead>
        Professors and students building climate-tech startups send in research they will not take
        forward. Next semester can find it. Ownership and attribution stay on the record.
      </Lead>
      <Tools action="/library" method="get">
        <Search>
          <MagnifyingGlass size={theme.icons.md} />
          <Input name="q" placeholder="Search leftover research" />
        </Search>
        <Button type="submit" variant="gold">
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
  </Hero>
)

export const HomeHero = React.memo(HomeHeroComponent)
HomeHero.displayName = 'HomeHero'

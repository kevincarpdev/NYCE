'use client'

import React from 'react'
import Link from 'next/link'
import { InstagramLogo, LinkedinLogo, YoutubeLogo } from '@phosphor-icons/react'
import styled from 'styled-components'

import { pageWidth } from '@/components/frontend/layout/Containers'
import { Button } from '@/components/frontend/ui/Button'
import { addressLines, exchangeLinks, socialLinks } from '@/lib/brand'
import { exchangeFooterLinks, hubFooterLinks } from '@/lib/navigation'
import { theme } from '@/theme/theme'

const icons = {
  instagram: InstagramLogo,
  linkedin: LinkedinLogo,
  youtube: YoutubeLogo,
}

const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.surface.raised};
  color: ${({ theme }) => theme.colors.content.primary};
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.border.subtle};
`

const Inner = styled.div`
  ${pageWidth};
  padding-block: ${({ theme }) => theme.spacing(20)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(12)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1.2fr 1fr 1fr;
    gap: ${({ theme }) => theme.spacing(16)};
  }
`

const Block = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(5)};
  align-content: start;
`

const Title = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.statement};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.content.accent};
`

const Label = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.content.accent};
`

const Copy = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
`

const Social = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.layout.footerIconGap};
`

const IconLink = styled.a`
  color: ${({ theme }) => theme.colors.content.accent};
  display: inline-flex;
  transition: color ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out};

  &:hover {
    color: ${({ theme }) => theme.colors.surface.ink};
  }
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
`

const Item = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.content.primary};
  transition: color ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out};

  &:hover {
    color: ${({ theme }) => theme.colors.content.accent};
  }
`

const External = styled.a`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.content.primary};
  transition: color ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out};

  &:hover {
    color: ${({ theme }) => theme.colors.content.accent};
  }
`

const Bottom = styled.div`
  ${pageWidth};
  padding-bottom: ${({ theme }) => theme.spacing(12)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
`

const Quiet = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.content.muted};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`

const SiteFooterComponent = () => (
  <Footer>
    <Inner>
      <Block>
        <Title>Stay in the Loop</Title>
        <Copy>Sign up to receive news and periodic updates from The Exchange.</Copy>
        <Button href={exchangeLinks.subscribe} size="lg" variant="gold">
          Subscribe
        </Button>
        <Social>
          {socialLinks.map((link) => {
            const Icon = icons[link.icon]
            return (
              <IconLink
                aria-label={link.label}
                href={link.href}
                key={link.label}
                rel="noreferrer"
                target="_blank"
              >
                <Icon size={theme.icons.xl} weight="regular" />
              </IconLink>
            )
          })}
        </Social>
      </Block>
      <Block>
        <Label>Knowledge Hub</Label>
        <List>
          {hubFooterLinks.map((link) => (
            <li key={link.href}>
              <Item href={link.href}>{link.label}</Item>
            </li>
          ))}
        </List>
      </Block>
      <Block>
        <Label>The Exchange</Label>
        <List>
          {exchangeFooterLinks.map((link) => (
            <li key={link.href}>
              {link.external ? (
                <External href={link.href} rel="noreferrer" target="_blank">
                  {link.label}
                </External>
              ) : (
                <Item href={link.href}>{link.label}</Item>
              )}
            </li>
          ))}
        </List>
      </Block>
    </Inner>
    <Bottom>
      {addressLines.map((line) => (
        <Copy key={line}>{line}</Copy>
      ))}
      <Copy>
        Questions? Visit our{' '}
        <External href={exchangeLinks.faq} rel="noreferrer" target="_blank">
          FAQ page
        </External>{' '}
        or email us at{' '}
        <External href={exchangeLinks.email}>{exchangeLinks.emailLabel}</External>
      </Copy>
      <Quiet>This hub sits next to nyce.org. Prototype by Kevin Carpenter.</Quiet>
    </Bottom>
  </Footer>
)

export const SiteFooter = React.memo(SiteFooterComponent)
SiteFooter.displayName = 'SiteFooter'

'use client'

import React from 'react'
import styled from 'styled-components'

const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.surface.ink};
  color: ${({ theme }) => theme.colors.content.inverse};
  margin-top: auto;
`

const Inner = styled.div`
  width: min(100% - ${({ theme }) => theme.spacing(8)}, ${({ theme }) => theme.layout.maxWidth});
  margin-inline: auto;
  padding-block: ${({ theme }) => theme.spacing(10)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`

const Muted = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.surface.canvas};
`

const SiteFooterComponent = () => (
  <Footer>
    <Inner>
      <strong>The New York Climate Exchange</strong>
      <Muted>10 South Street, Slip 7, New York, NY 10004</Muted>
      <Muted>
        This hub sits next to nyce.org. It is not a rebuild of the public site. Payload CMS runs
        the library people see and the admin reviewers use.
      </Muted>
    </Inner>
  </Footer>
)

export const SiteFooter = React.memo(SiteFooterComponent)
SiteFooter.displayName = 'SiteFooter'

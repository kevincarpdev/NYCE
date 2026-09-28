'use client'

import React from 'react'
import styled from 'styled-components'

import { AuthPhotoPanel } from '@/components/frontend/auth/AuthPhotoPanel'
import { PartnerMarquee } from '@/components/frontend/auth/PartnerMarquee'

const Shell = styled.div`
  flex: 1;
  display: grid;
  width: 100%;
  min-height: 100%;
  background: ${({ theme }) => theme.colors.surface.paper};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: minmax(0, ${({ theme }) => theme.layout.authPhotoRatio}) minmax(
        ${({ theme }) => theme.layout.authFormWidth},
        1fr
      );
    min-height: calc(100vh - ${({ theme }) => theme.layout.bannerHeight});
  }
`

const PhotoColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  min-height: ${({ theme }) => theme.layout.authMobilePhoto};
  background: ${({ theme }) => theme.colors.surface.canvas};
`

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  padding: ${({ theme }) => theme.spacing(6)};
  background: ${({ theme }) => theme.colors.surface.paper};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing(10)};
    overflow: auto;
  }
`

const FormInner = styled.div`
  width: min(100%, ${({ theme }) => theme.layout.authFormWidth});
  margin-inline: auto;
  display: grid;
  gap: ${({ theme }) => theme.spacing(6)};
`

type AuthShellProps = {
  children: React.ReactNode
}

const AuthShellComponent = ({ children }: AuthShellProps) => (
  <Shell>
    <PhotoColumn>
      <AuthPhotoPanel />
      <PartnerMarquee />
    </PhotoColumn>
    <FormColumn>
      <FormInner>{children}</FormInner>
    </FormColumn>
  </Shell>
)

export const AuthShell = React.memo(AuthShellComponent)
AuthShell.displayName = 'AuthShell'

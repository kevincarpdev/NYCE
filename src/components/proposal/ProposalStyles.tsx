'use client'

import React from 'react'
import styled, { css } from 'styled-components'

export const Sheet = styled.section`
  background: ${({ theme }) => theme.colors.surface.raised};
  color: ${({ theme }) => theme.colors.content.primary};
  padding: ${({ theme }) => theme.spacing(14)};
  min-height: ${({ theme }) => theme.layout.sheetMin};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
  page-break-after: always;
  break-after: page;

  @media print {
    min-height: ${({ theme }) => theme.layout.letterHeight};
    height: ${({ theme }) => theme.layout.letterHeight};
    overflow: hidden;
    padding: ${({ theme }) => theme.spacing(10)};
    gap: ${({ theme }) => theme.spacing(5)};
  }

  &:last-of-type {
    page-break-after: auto;
    break-after: auto;
  }

  h1,
  h2 {
    margin: 0;
    color: ${({ theme }) => theme.colors.content.accent};
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSizes.section};
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  }

  p,
  li {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    line-height: ${({ theme }) => theme.typography.lineHeights.body};
  }
`

export const Eyebrow = styled.p`
  margin: 0;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.content.accent};
`

export const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(6)};
  grid-template-columns: 1fr 1fr;
`

export const List = styled.ul`
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing(5)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`

const mapCols = css`
  th:nth-child(1),
  td:nth-child(1) {
    width: 34%;
  }

  th:nth-child(2),
  td:nth-child(2) {
    width: 18%;
  }
`

const scheduleCols = css`
  th:nth-child(1),
  td:nth-child(1) {
    width: 22%;
  }

  th:nth-child(2),
  td:nth-child(2) {
    width: 28%;
  }
`

const pairCols = css`
  th:nth-child(1),
  td:nth-child(1) {
    width: 72%;
  }

  th:nth-child(2),
  td:nth-child(2) {
    width: 28%;
  }
`

export const Table = styled.table<{ $layout?: 'map' | 'schedule' | 'pair' }>`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};

  th,
  td {
    text-align: left;
    vertical-align: top;
    overflow-wrap: break-word;
    white-space: normal;
    padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)}
      ${({ theme }) => theme.spacing(3)} 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.subtle};
  }

  th:last-child,
  td:last-child {
    padding-right: 0;
  }

  ${({ $layout }) => ($layout === 'schedule' ? scheduleCols : $layout === 'pair' ? pairCols : mapCols)}

  @media print {
    th,
    td {
      padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)}
        ${({ theme }) => theme.spacing(2)} 0;
    }
  }

  th {
    color: ${({ theme }) => theme.colors.content.accent};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  }
`

export const Gold = styled.div`
  background: ${({ theme }) => theme.colors.surface.gold};
  color: ${({ theme }) => theme.colors.surface.ink};
  padding: ${({ theme }) => theme.spacing(6)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const Line = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.strong};
  min-height: ${({ theme }) => theme.spacing(8)};
`

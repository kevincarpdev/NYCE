export type NavLeaf = {
  label: string
  href: string
  external?: boolean
}

export type NavGroup = {
  label: string
  href: string
  items: NavLeaf[]
}

export const hubNav: NavGroup[] = [
  {
    label: 'Library',
    href: '/library',
    items: [
      { label: 'Browse leftovers', href: '/library' },
      { label: 'How to look at this', href: '/walkthrough' },
    ],
  },
  {
    label: 'Contribute',
    href: '/submit',
    items: [
      { label: 'Send work in', href: '/submit' },
      { label: 'My submissions', href: '/mine' },
      { label: 'Guidelines', href: '/guidelines' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    items: [
      { label: 'The Knowledge Hub', href: '/about' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
]

export const hubFooterLinks: NavLeaf[] = [
  { label: 'Library', href: '/library' },
  { label: 'Send work in', href: '/submit' },
  { label: 'Guidelines', href: '/guidelines' },
  { label: 'Walkthrough', href: '/walkthrough' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About', href: '/about' },
]

export const exchangeFooterLinks: NavLeaf[] = [
  { label: 'Our Story', href: 'https://nyce.org/our-story', external: true },
  { label: 'Climate campus', href: 'https://nyce.org/climate-campus', external: true },
  { label: 'Partners', href: 'https://nyce.org/the-partners', external: true },
  { label: 'Careers', href: 'https://nyce.org/careers', external: true },
  { label: 'News', href: 'https://nyce.org/news', external: true },
  { label: 'Give', href: 'https://the-ny-climate-exchange.givecloud.co/fundraising/forms/8NDR96EK', external: true },
]

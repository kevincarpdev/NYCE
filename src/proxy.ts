import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { isSafePath } from '@/lib/safePath'

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  if (pathname === '/admin/login' || pathname === '/admin/login/') {
    const target = request.nextUrl.clone()
    target.pathname = '/sign-in'
    target.search = ''
    const redirect = searchParams.get('redirect')
    target.searchParams.set('next', isSafePath(redirect) ? redirect : '/admin')
    return NextResponse.redirect(target)
  }

  if (pathname === '/admin/unauthorized' || pathname === '/admin/unauthorized/') {
    const target = request.nextUrl.clone()
    target.pathname = '/sign-in'
    target.search = ''
    target.searchParams.set('reason', 'admin')
    target.searchParams.set('next', '/admin')
    return NextResponse.redirect(target)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/login', '/admin/login/', '/admin/unauthorized', '/admin/unauthorized/'],
}

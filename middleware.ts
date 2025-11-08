// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_PATHS = ['/profile', '/notes'];

const AUTH_PATHS = ['/sign-in', '/sign-up'];

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('token');
  const isAuthenticated = !!authToken;
  const pathname = request.nextUrl.pathname;

  if (isAuthenticated && AUTH_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  const isProtectedPath = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(path),
  );

  if (!isAuthenticated && isProtectedPath) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets|public|manifest|robots|sitemap).*)',
  ],
};

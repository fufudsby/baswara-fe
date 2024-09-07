import { NextResponse, NextRequest } from 'next/server'
import { getToken, JWT } from 'next-auth/jwt'
import { User } from 'types/next-auth'

interface SessionJWT extends JWT {
  user?: User
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const session: SessionJWT | null = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    // secureCookie: false,
    secureCookie: process.env.NODE_ENV === 'production',
  })

  if (!session) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

export const config = {
  matcher: [
    '/api/((?!auth).*)',
    '/weather-records',
    '/locations',
    '/forecasts'
  ],
}

export async function proxy(request: NextRequest) {
  const user = await getCurrentUser(request)
  
  // 如果没有用户，重定向到登录页（如果有）
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}
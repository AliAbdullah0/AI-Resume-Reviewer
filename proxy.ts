import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const cookie = request.cookies.get("better-auth.session_token")
  const pathname = request.nextUrl.pathname

  if (cookie && ( pathname.startsWith("/sign-up") || pathname.startsWith("/") || pathname.startsWith("/sign-in"))) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/sign-up","/"],
}

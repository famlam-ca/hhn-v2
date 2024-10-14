import { NextRequest, NextResponse } from "next/server"

import { getCallbackUrl } from "@/lib/utils"

export default async function middleware(req: NextRequest) {
  const authCookie = req.cookies.get("auth_session")
  if (!authCookie || !authCookie.value) {
    const callbackUrl = getCallbackUrl(req)
    return NextResponse.redirect(
      new URL(`/signin?next=${callbackUrl}`, req.nextUrl),
    )
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/kanban/:path*", "/dashboard/:path*"],
}

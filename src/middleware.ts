import { type NextRequest, NextResponse } from "next/server"

export const config = {
  matcher: ["/dashboard/:path*", "/board/:path*"],
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (request.method === "GET") {
    const response = NextResponse.next()
    const token = request.cookies.get("session")?.value ?? null
    if (token !== null) {
      response.cookies.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
      })
    } else {
      return NextResponse.redirect(new URL("/signin", request.nextUrl))
    }
    return response
  }

  const originHeader = request.headers.get("Origin")
  const hostHeader = request.headers.get("Host")
  if (originHeader === null || hostHeader === null) {
    return new NextResponse(null, { status: 403 })
  }
  let origin: URL
  try {
    origin = new URL(originHeader)
  } catch {
    return new NextResponse(null, { status: 403 })
  }
  if (origin.host !== hostHeader) {
    return new NextResponse(null, { status: 403 })
  }
  return NextResponse.next()
}

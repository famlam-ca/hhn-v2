import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { NextRequest } from "next/server"

import { lucia } from "@/server/auth"
import { db } from "@/server/db"

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url)
    const searchParams = url.searchParams
    const token = searchParams.get("token")
    if (!token) {
      return Response.json({ error: "Token does not exist." }, { status: 400 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string
      userId: string
      token: string
    }

    const emailVerificationQueryResult =
      await db.emailVerificationToken.findFirst({
        where: {
          userId: decoded.userId,
          token: decoded.token,
        },
      })
    if (!emailVerificationQueryResult) {
      return Response.json({ error: "Invalid token." }, { status: 400 })
    }

    await db.emailVerificationToken.delete({
      where: { id: emailVerificationQueryResult.id },
    })

    await db.user.update({
      where: { email: decoded.email },
      data: { isEmailVerified: true },
    })

    const userSession = await db.session.findFirst({
      where: { userId: decoded.userId },
    })
    if (!userSession) {
      await db.session.deleteMany({
        where: { userId: decoded.userId },
      })
    }

    const session = await lucia.createSession(decoded.userId, {
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    })

    const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )

    return Response.redirect(new URL(process.env.NEXT_URL!), 302)
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

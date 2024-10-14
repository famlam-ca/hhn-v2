"use server"

import { compare, hash } from "bcrypt"
import jwt from "jsonwebtoken"
import { generateId } from "lucia"
import { cookies } from "next/headers"
import { z } from "zod"

import { sendEmail } from "@/actions/email"
import { lucia, validateSession } from "@/server/auth"
import { db } from "@/server/db"
import { SignInSchema, SignUpSchema1, SignUpSchema2 } from "@/validators/auth"

export const signUp = async (
  values: z.infer<typeof SignUpSchema1> & z.infer<typeof SignUpSchema2>,
) => {
  const hashedPassword = await hash(values.password, 12)
  const userId = generateId(15)

  const isUsernameExists = await db.user.findUnique({
    where: { username: values.username },
  })
  if (isUsernameExists) {
    return {
      success: false,
      message: "Username is already taken!",
    }
  }

  const isEmailExists = await db.user.findUnique({
    where: { email: values.email },
  })
  if (isEmailExists) {
    return {
      success: false,
      message: "An account with that email address already exists!",
      action: {
        message: "Signin?",
        href: "/signin",
      },
    }
  }

  try {
    await db.user.create({
      data: {
        id: userId,
        display_name: values.display_name,
        username: values.username,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: hashedPassword,
      },
    })

    const token = Math.random().toString().substring(2, 8)

    await db.emailVerificationToken.create({
      data: {
        id: generateId(15),
        token,
        userId,
        sentAt: new Date(Date.now()),
      },
    })

    const jwtToken = jwt.sign(
      { email: values.email, userId, token },
      process.env.JWT_SECRET!,
      { expiresIn: "5m" },
    )

    const url = `${process.env.NEXT_URL}/api/verify-email?token=${jwtToken}`

    const data = {
      username: values.username,
      url,
    }

    await sendEmail({
      to: values.email,
      subject: "Verify your email",
      template: "verify-email",
      data,
    })

    return {
      success: true,
      message: "Account created successfully!",
      description: "Please check your email to verify your account.",
      data: {
        userId,
      },
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
  try {
    SignInSchema.parse(values)
  } catch (error: any) {
    return {
      success: false,
      message: "Invalid email or password!",
    }
  }

  const user = await db.user.findUnique({
    where: {
      email: values.email,
    },
  })
  if (!user) {
    return {
      success: false,
      message: "No account with that email address found!",
    }
  }

  const isValidPassword = await compare(values.password, user.password)
  if (!isValidPassword) {
    return {
      success: false,
      message: "Invalid password!",
    }
  }

  if (user.isEmailVerified === false) {
    return {
      success: false,
      message: "Email not verified!",
      key: "email_not_verified",
      action: {
        message: "Resend email?",
      },
    }
  }

  try {
    const session = await lucia.createSession(user.id, {
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    })

    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )

    return {
      success: true,
    }
  } catch (error: any) {
    return {
      success: false,
      message: "Invalid email or password!",
    }
  }
}

export const signOut = async () => {
  try {
    const { session } = await validateSession()
    if (!session) {
      return {
        success: false,
        message: "No session found",
      }
    }

    const sessionCookie = lucia.createBlankSessionCookie()
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )

    await lucia.invalidateSession(session.id)

    return {
      success: true,
      message: "Signed out!",
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}

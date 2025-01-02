import { Team, User } from "@prisma/client"
import { compare, hash } from "bcrypt"
import { z } from "zod"

import {
  SignUpSchema1,
  SignUpSchema2,
} from "@/app/(platform)/(auth)/signup/schema"
import { unsplash } from "@/lib/unsplash"
import { incrementAvailableTeamCount } from "@/lib/user-limit"
import { db } from "@/server/db"

export async function createUser(
  values: z.infer<typeof SignUpSchema1> & z.infer<typeof SignUpSchema2>,
): Promise<User> {
  const passwordHash = await hash(values.password, 12)
  const { passwordConfirmation, ...userValues } = values

  const passwordMatches = await compare(passwordConfirmation, passwordHash)
  if (!passwordMatches) {
    throw new Error("Password does not match")
  }

  const user = await db.user.create({
    data: { ...userValues, password: passwordHash },
  })
  if (user === null) {
    throw new Error("Unexpected error")
  }

  return user
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const user = await db.user.findUnique({
    where: { email },
  })
  if (user === null) {
    if (user === null) {
      return null
    }
  }

  return user
}

export async function checkNameAvailability(name: string): Promise<boolean> {
  const row = await db.user.findUnique({
    where: { name },
  })
  if (row === null) {
    return true
  }
  return false
}

export async function updateUserEmailAndSetEmailAsVerified(
  userId: string,
  email: string,
): Promise<void> {
  await db.user.update({
    where: { id: userId },
    data: { email, emailVerified: true },
  })
}

export async function createFirstUserTeam(userId: string): Promise<Team> {
  const result = await unsplash.photos.getRandom({
    collectionIds: ["317099"],
    count: 1,
  })

  const randomImage = (result.response as Array<Record<string, any>>)[0]
  const {
    id: imageId,
    urls: { thumb: imageThumbUrl, full: imageFullUrl, regular: imageLinkHtml },
    user: { username: imageUsername },
  } = randomImage

  const user = await db.user.findUnique({
    where: { id: userId },
  })
  if (user === null) {
    throw new Error("User not found")
  }

  const team = await db.team.create({
    data: {
      title: `${user.displayName}'s Team`,
      imageId,
      imageThumbUrl,
      imageFullUrl,
      imageLinkHtml,
      imageUsername,
      members: {
        create: {
          userId,
          role: "OWNER",
        },
      },
    },
  })

  await incrementAvailableTeamCount({ userId })

  return team
}

"use server"

import { ROLE, User } from "@prisma/client"
import { revalidatePath } from "next/cache"

import { ActionResponse } from "@/hooks/use-action"
import { db } from "@/server/db"

export async function changeUserRole({
  id,
  role,
}: {
  id: string
  role: ROLE
}): Promise<ActionResponse<{ updatedUser: User }>> {
  try {
    const updatedUser = await db.user.update({
      where: { id },
      data: { role },
    })

    revalidatePath("/admin/users")

    return {
      data: {
        updatedUser,
      },
    }
  } catch {
    return {
      error: "Failed to change role",
    }
  }
}

export async function bulkDeleteUsers({
  ids,
}: {
  ids: string[]
}): Promise<ActionResponse<{ deletedUsers: { count: number } }>> {
  try {
    const deletedUsers = await db.user.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    })

    revalidatePath("/admin/users")

    return {
      data: {
        deletedUsers,
      },
    }
  } catch {
    return {
      error: "Failed to delete users",
    }
  }
}

export async function deleteUserSessions({
  id,
}: {
  id: string
}): Promise<ActionResponse<{ deletedSessions: { count: number } }>> {
  try {
    const deletedSessions = await db.session.deleteMany({
      where: {
        userId: id,
      },
    })

    return {
      data: {
        deletedSessions,
      },
    }
  } catch {
    return {
      error: "Failed to delete sessions",
    }
  }
}

export async function deleteUserAction({
  id,
}: {
  id: string
}): Promise<ActionResponse<{ deletedUser: User }>> {
  try {
    const deletedUser = await db.user.delete({
      where: { id },
    })

    revalidatePath("/admin/users")

    return {
      data: {
        deletedUser,
      },
    }
  } catch {
    return {
      error: "Failed to delete user",
    }
  }
}

import { db } from "@/server/db"
import { User } from "@/types"

import { columns } from "./_components/columns"
import { DataTable } from "./_components/table"

export default async function UsersPage() {
  const users = (await db.user.findMany({
    include: {
      sessions: true,
    },
    orderBy: {
      name: "asc",
    },
  })) as User[]

  const mockUsers = Array(50)
    .fill(null)
    .map((_, i) => ({
      id: (i + 1).toString(),
      name: `User ${i + 1}`,
      displayName: `User ${i + 1}`,
      firstName: `User ${i + 1}`,
      lastName: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      emailVerified: i % 3 === 0 ? false : true,
      password: "password",
      image: null,
      role: i % 5 === 0 ? "ADMIN" : "USER",
      bio: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      sessions:
        i % 4 === 0
          ? [
              {
                id: "1",
                expires: new Date(),
                sessionToken: "token",
              },
            ]
          : [],
    })) as unknown as User[]
  users.push(...mockUsers)

  return (
    <div className="flex h-[calc(100vh-2rem)] flex-col">
      <h1 className="py-4 text-3xl font-bold">Users</h1>

      <DataTable columns={columns} data={users} />
    </div>
  )
}

import { notFound } from "next/navigation"

import { db } from "@/server/db"

interface UserPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function UserPage({ params }: UserPageProps) {
  const id = (await params).id

  const user = await db.user.findUnique({
    where: { id },
  })
  if (user === null) {
    return notFound()
  }

  return (
    <div className="py-10">
      <h1 className="mb-6 text-3xl font-bold">{user.name}</h1>
    </div>
  )
}

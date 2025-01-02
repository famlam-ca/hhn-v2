import { db } from "@/server/db"

import { columns } from "./_components/columns"
import { DataTable } from "./_components/table"
import { Team } from "@/types"

export default async function TeamsPage() {
  const teams = (await db.team.findMany({
    include: {
      boards: true,
      members: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  })) as Team[]

  return (
    <div className="py-10">
      <h1 className="mb-6 text-3xl font-bold">Teams</h1>
      <DataTable columns={columns} data={teams} />
    </div>
  )
}

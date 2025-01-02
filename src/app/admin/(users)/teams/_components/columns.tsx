"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

import { Team } from "@/types"

export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "plan",
    header: "Plan",
  },
  {
    accessorKey: "members",
    header: () => <div className="text-right">Members</div>,
    cell: ({ row }) => {
      const formatted = row.original.members.length

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "boards",
    header: () => <div className="text-right">Boards</div>,
    cell: ({ row }) => {
      const formatted = row.original.boards.length

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-right">Created At</div>,
    cell: ({ row }) => {
      const formatted = format(row.original.createdAt, "MMM d, yyyy")

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
  },
]

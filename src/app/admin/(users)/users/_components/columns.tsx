"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

import { Checkbox } from "@/components/ui/checkbox"

import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/ui/table/column-header"
import { User } from "@/types"

import UserActions from "./user-actions"

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "displayName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Display Name" />
    ),
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      return row.original.role === "ADMIN" ? (
        <div className="text-warning-foreground">Admin</div>
      ) : (
        <div className="text-success-foreground">User</div>
      )
    },
  },
  {
    accessorKey: "sessions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sessions" />
    ),
    cell: ({ row }) => {
      const formatted = row.original.sessions.length

      return <div className="text-center">{formatted}</div>
    },
  },
  {
    accessorKey: "emailVerified",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email Verified" />
    ),
    cell: ({ row }) => {
      // TODO: Make this a component/selector
      return row.original.emailVerified ? (
        <Badge variant="success">Yes</Badge>
      ) : (
        <Badge variant="destructive">No</Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const formatted = format(row.original.createdAt, "MMM d, yyyy")

      return formatted
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      return <UserActions row={row} />
    },
  },
]

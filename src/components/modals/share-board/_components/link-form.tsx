"use client"

import { InvitePermission } from "@prisma/client"
import { Dot, Link } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"

export interface PermissionItemProps {
  value: InvitePermission
  description: string
}

interface LinkFormProps {
  copyInvite: () => void
  createInvite: (permission: InvitePermission) => void
  deleteInvite: () => void
}

export const LinkForm = ({
  copyInvite,
  createInvite,
  deleteInvite,
}: LinkFormProps) => {
  const [permission, setPermission] = useState<InvitePermission>("member")

  const PERMISSIONS_ITEMS: PermissionItemProps[] = [
    {
      value: "member",
      description: "Members can view, comment, and edit some board settings.",
    },
    {
      value: "observer",
      description: "Observers can only view and comment on the board.",
    },
  ]

  return (
    <div className="flex flex-col">
      <div className="flex space-x-4">
        <div className="flex flex-grow items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent">
            <Link className="size-4 stroke-muted-foreground" />
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Anyone with the link can join as a {permission}</p>

            <div className="flex items-center text-primary">
              <button
                type="button"
                onClick={copyInvite}
                className="hover:underline"
              >
                Copy Link
              </button>
              <Dot className="mt-0.5 size-4 stroke-muted-foreground" />
              <button
                type="button"
                onClick={deleteInvite}
                className="hover:underline"
              >
                Delete Link
              </button>
              <Dot className="mt-0.5 size-4 stroke-muted-foreground" />
              <button
                type="button"
                onClick={() => {
                  createInvite(permission)
                  toast.success("Link created!")
                }}
                className="hover:underline"
              >
                Create Link
              </button>
            </div>
          </div>
        </div>

        <div className="flex-grow">
          <Select
            defaultValue={permission}
            onValueChange={(permission: InvitePermission) => {
              setPermission(permission)
              createInvite(permission)
            }}
          >
            <SelectTrigger>Change permissions</SelectTrigger>
            <SelectContent className="max-w-xs">
              {PERMISSIONS_ITEMS.map((permission) => (
                <SelectItem key={permission.value} value={permission.value}>
                  <p className="capitalize">{permission.value}</p>
                  <span className="text-muted-foreground">
                    {permission.description}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

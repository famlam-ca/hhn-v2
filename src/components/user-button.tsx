"use client"

import { User } from "@prisma/client"
import {
  CloudCog,
  LifeBuoy,
  LogOut,
  Newspaper,
  Phone,
  Settings,
  UserCircle,
  UserCog,
  UserIcon,
} from "lucide-react"
import Link from "next/link"

import { SignOutButton } from "@/components/signout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserButtonProps {
  user: User
}

export function UserButton({ user }: UserButtonProps) {
  const fullName = `${user.firstName} ${user.lastName}`

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.image ?? ""} />
          <AvatarFallback>{user.name?.[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex w-full flex-col space-y-0.5">
            <div className="flex justify-between">
              <p className="text-sm font-medium">{user.displayName}</p>
              {fullName && (
                <p className="truncate text-xs font-medium text-muted-foreground">
                  {fullName}
                </p>
              )}
            </div>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
            <p className="text-xs capitalize text-muted-foreground">
              {user.role.toLowerCase()}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <p className="text-muted-foreground">Account</p>
          </DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <Link href={`/u/${user.name}/profile`}>
              <UserCircle className="mr-2 size-5" />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`/u/${user.name}/account`}>
              <UserIcon className="mr-2 size-5" />
              Account
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`/u/${user.name}/settings`}>
              <Settings className="mr-2 size-5" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <p className="text-muted-foreground">Support</p>
          </DropdownMenuLabel>

          {/* TODO: Change link */}
          <DropdownMenuItem asChild>
            <Link href="https://lasse.famlam.ca#contact" target="_blank">
              <LifeBuoy className="mr-2 size-5" />
              Support
            </Link>
          </DropdownMenuItem>

          {/* TODO: Change link */}
          <DropdownMenuItem asChild>
            <Link href="https://lasse.famlam.ca#contact" target="_blank">
              <Phone className="mr-2 size-5" />
              Contact
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <p className="text-muted-foreground">Documentation</p>
          </DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <Link href="https://docs.famlam.ca" target="_blank">
              <Newspaper className="mr-2 size-5" />
              Docs
            </Link>
          </DropdownMenuItem>

          {/* TODO: Create api docs */}
          <DropdownMenuItem disabled={user.role !== "ADMIN"} asChild>
            <Link href="https://docs.famlam.ca/api">
              <CloudCog className="mr-2 size-5" />
              API
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {user.role === "ADMIN" && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <p className="text-muted-foreground">Administration</p>
              </DropdownMenuLabel>

              {/* TODO: Create admin page */}
              <DropdownMenuItem disabled asChild>
                <Link href="/admin">
                  <UserCog className="mr-2 size-5" />
                  Admin
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem asChild>
          <SignOutButton variant="ghost" className="w-full justify-start">
            <LogOut className="mr-2 size-5" />
            Sign Out
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

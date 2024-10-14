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

interface UserMenuProps {
  user: User
  pathname: string
}

export const UserMenu = ({ user, pathname }: UserMenuProps) => {
  const full_name = `${user.first_name} ${user.last_name}`

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.image || ""} />
          <AvatarFallback>{user.username[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex w-full flex-col space-y-0.5">
            <div className="flex justify-between">
              <p className="text-sm font-medium">{user.display_name}</p>
              {full_name && (
                <p className="truncate text-xs font-medium text-muted-foreground">
                  {full_name}
                </p>
              )}
            </div>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
            <p className="text-xs capitalize text-muted-foreground">
              {user.role}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <p className="text-muted-foreground">Account</p>
          </DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <Link href={`/u/${user.username}`}>
              <UserCircle className="mr-2 h-5 w-5" />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`/u/${user.username}/account`}>
              <UserIcon className="mr-2 h-5 w-5" />
              Account
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`/u/${user.username}/settings`}>
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <p className="text-muted-foreground">Support</p>
          </DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <Link href="/contact/support">
              <LifeBuoy className="mr-2 h-5 w-5" />
              Support
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/contact">
              <Phone className="mr-2 h-5 w-5" />
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
            <Link href="https://docs.famlam.ca">
              <Newspaper className="mr-2 h-5 w-5" />
              Docs
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem disabled={user.role !== "admin"} asChild>
            <Link href="https://docs.famlam.ca/api">
              <CloudCog className="mr-2 h-5 w-5" />
              API
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {user.role === "admin" && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <p className="text-muted-foreground">Administration</p>
              </DropdownMenuLabel>

              <DropdownMenuItem asChild>
                <Link href="/admin">
                  <UserCog className="mr-2 h-5 w-5" />
                  Admin
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem asChild>
          <Link href={`/signout?next=${pathname}`}>
            <LogOut className="mr-1 h-5 w-5" />
            Sign Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

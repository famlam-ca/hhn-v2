"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function useRouteCheck(
  routeNames: string[],
  isDynamic: boolean = false,
) {
  const pathname = usePathname()

  const [isRoute, setIsRoute] = useState<boolean>(false)

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean)
    if (isDynamic) {
      const isMatch = pathSegments[0] === "kanban" && pathSegments.length > 1
      setIsRoute(isMatch)
    } else {
      const match = routeNames.some((route) => pathSegments.includes(route))
      setIsRoute(match)
    }
  }, [pathname, routeNames, isDynamic])

  return isRoute
}

"use client"

import { Session, User } from "lucia"
import { createContext, useContext } from "react"

interface SessionProviderProps {
  session: Session | null
  user: User | null
}

const SessionContext = createContext<SessionProviderProps>(
  {} as SessionProviderProps,
)

export const useSession = () => {
  const sessionContext = useContext(SessionContext)
  if (!sessionContext) {
    throw new Error("useSession must be used within a SessionProvider")
  }

  return sessionContext
}

export const SessionProvider = ({
  sessionData,
  children,
}: {
  sessionData: SessionProviderProps
  children: React.ReactNode
}) => {
  return (
    <SessionContext.Provider value={sessionData}>
      {children}
    </SessionContext.Provider>
  )
}

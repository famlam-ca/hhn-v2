import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ModalProvider } from "@/providers"
import { TRPCReactProvider } from "@/trpc/react"

import { AdminSidebar } from "./_components/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TRPCReactProvider>
      <SidebarProvider>
        <AdminSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <ModalProvider />
          <MaxWidthWrapper>{children}</MaxWidthWrapper>
        </main>
      </SidebarProvider>
    </TRPCReactProvider>
  )
}

"use client"

import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useProModal } from "@/hooks/use-pro-modal"

export function ProModal() {
  const proModal = useProModal()

  const onClick = () => {
    window.location.href = "/pricing"
  }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="max-w-md overflow-hidden">
        <div className="relative flex aspect-video items-center justify-center">
          <Image
            fill
            src="/pro-modal-hero.svg"
            alt="hero"
            className="obejct-cover"
          />
        </div>
        <DialogHeader className="mx-auto space-y-6 p-6 text-muted-foreground">
          <DialogTitle className="text-xl font-semibold">
            Upgrade Today!
          </DialogTitle>
          <DialogDescription className="text-xs font-semibold text-muted-foreground/80">
            Get more out of HHN with more workspaces, more boards, and more
            features!
          </DialogDescription>
          <div className="pl-3">
            <ul className="list-disc text-sm">
              <li>More workspaces</li>
              <li>More boards</li>
              <li>More features</li>
              <li>More to come!</li>
            </ul>
          </div>
          <Button onClick={onClick} variant="default" className="w-full">
            Upgrade
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

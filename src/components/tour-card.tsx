"use client"

import confetti from "canvas-confetti"
import { X } from "lucide-react"
import type { CardComponentProps } from "onborda"
import { useOnborda } from "onborda"
import React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const TourCard: React.FC<CardComponentProps> = ({
  step,
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  arrow,
}) => {
  const { closeOnborda } = useOnborda()

  function handleConfetti() {
    closeOnborda()
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  return (
    <Card className="relative z-[999] w-max min-w-[300px] max-w-full border-0 border-none bg-foreground">
      <CardHeader>
        <div className="flex w-full items-start justify-between space-x-4">
          <div className="flex flex-col space-y-2">
            <CardDescription className="text-muted">
              {currentStep + 1} of {totalSteps}
            </CardDescription>
            <CardTitle className="mb-2 text-lg text-background">
              {step.icon} {step.title}
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            className="absolute right-2 top-4 hover:bg-transparent"
            size="icon"
            onClick={() => closeOnborda()}
          >
            <X className="size-4 stroke-muted" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="text-background">{step.content}</CardContent>
      <CardFooter>
        <div className="flex w-full justify-between gap-4">
          {currentStep !== 0 && (
            <Button onClick={() => prevStep()} variant="secondary">
              Previous
            </Button>
          )}
          {currentStep + 1 !== totalSteps && (
            <Button
              onClick={() => nextStep()}
              variant="secondary"
              className="ml-auto"
            >
              Next
            </Button>
          )}
          {currentStep + 1 === totalSteps && (
            <Button
              onClick={handleConfetti}
              variant="secondary"
              className="ml-auto"
            >
              🎉 Finish!
            </Button>
          )}
        </div>
      </CardFooter>
      <span className="text-foreground">{arrow}</span>
    </Card>
  )
}

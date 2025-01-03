"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { PLAN } from "@prisma/client"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { LoadingButton } from "@/components/ui/loading-button"
import { PLAN_INTERVAL } from "@/types"

import { resendEmailVerificationCode, verifyEmail } from "../actions"
import { VerifyEmailSchema } from "../schema"

export function VerifyEmailForm({
  plan,
  interval,
}: {
  plan?: PLAN
  interval?: PLAN_INTERVAL
}) {
  const form = useForm<z.infer<typeof VerifyEmailSchema>>({
    resolver: zodResolver(VerifyEmailSchema),
    defaultValues: {
      code: "",
      plan,
      interval,
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof VerifyEmailSchema>) => {
    const res = await verifyEmail(values)
    if (!res.success) {
      if (res.key === "code_expired") {
        toast.info(res.message, {
          position: "bottom-left",
        })
      } else if (res.key === "no_verification_request") {
        toast.error(res.message, {
          position: "bottom-left",
          action: {
            label: "Resend Email",
            onClick: () => resendVerificationEmail(),
          },
        })
      } else {
        toast.error(res.message, {
          position: "bottom-left",
        })
      }
    }
  }

  const resendVerificationEmail = async () => {
    const res = await resendEmailVerificationCode()
    if (!res.success) {
      toast.error(res.message, {
        position: "bottom-left",
      })
    } else {
      toast.success(res.message, {
        position: "bottom-left",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="interval"
          render={({ field }) => (
            <FormItem hidden>
              <FormControl>{field.value}</FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="plan"
          render={({ field }) => (
            <FormItem hidden>
              <FormControl>{field.value}</FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="items flex justify-center">
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          loading={isLoading}
          type="submit"
          className="w-full uppercase shadow-md"
        >
          Verify Email
        </LoadingButton>
      </form>

      <div className="mt-10 text-center text-sm text-muted-foreground">
        Didn&apos;t receive the email?
        <Button
          onClick={() => resendVerificationEmail()}
          type="button"
          size="sm"
          variant="link"
          className="px-1.5"
        >
          Resend Email
        </Button>
      </div>
    </Form>
  )
}

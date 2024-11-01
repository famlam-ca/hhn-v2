"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { FloatingLabelInput } from "@/components/ui/floating-label-input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { LoadingButton } from "@/components/ui/loading-button"

import { SignIn } from "../actions"
import { SignInSchema } from "../schema"

export function SignInForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const togglePassword = () => setShowPassword(!showPassword)

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    const res = await SignIn(values)
    if (!res.success) {
      toast.error(res.message, {
        position: "bottom-left",
        action: res.key === "no_user_found" && {
          label: "Sign Up",
          onClick: () => window.location.assign("/signup"),
        },
      })
    }
  }

  const styles = {
    input:
      "border-0 bg-background/50 ring-1 ring-input focus-visible:ring-primary",
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  {...field}
                  autoFocus
                  type="email"
                  label="Email"
                  className={styles.input}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="relative">
                <FormControl>
                  <FloatingLabelInput
                    {...field}
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    className={styles.input}
                  />
                </FormControl>
                <button
                  onClick={togglePassword}
                  type="button"
                  tabIndex={-1}
                  className="absolute right-2 top-[25%]"
                >
                  {showPassword ? (
                    <>
                      <EyeOff aria-hidden className="size-5" />
                      <span className="sr-only">Hide</span>
                    </>
                  ) : (
                    <>
                      <Eye aria-hidden className="size-5" />
                      <span className="sr-only">Show</span>
                    </>
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          loading={isLoading}
          type="submit"
          className="w-full uppercase shadow-md"
        >
          Sign In
        </LoadingButton>
      </form>
    </Form>
  )
}

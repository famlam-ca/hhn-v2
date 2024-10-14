"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { signIn } from "@/actions/auth"
import { resendVerificationEmail } from "@/actions/email"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignInSchema } from "@/validators/auth"

export const SignInForm = () => {
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
    const res = await signIn(values)
    if (!res.success) {
      toast.error(res.message, {
        action: res.action && {
          label: res.action.message,
          onClick: handleActionClick,
        },
      })
    }
  }

  const handleActionClick = async () => {
    const res = await resendVerificationEmail(form.getValues("email"))
    if (res.success) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  const styles = {
    input:
      "border-0 bg-background/50 ring-1 ring-input placeholder:text-muted-foreground  focus-visible:ring-primary",
  }

  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="mx-auto mb-10 flex items-center justify-center">
          <Icons.icon noAmimation />

          <h1 className="text-center text-3xl font-bold leading-9 tracking-tight md:text-4xl lg:text-5xl">
            Sign In
          </h1>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="jdoe@gmail.com"
                        {...field}
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          {...field}
                          className={styles.input}
                        />
                        <button
                          onClick={togglePassword}
                          type="button"
                          tabIndex={-1}
                          className="absolute right-2 top-[25%]"
                        >
                          {showPassword ? (
                            <>
                              <EyeOff aria-hidden className="h-5 w-5" />
                              <span className="sr-only">Hide</span>
                            </>
                          ) : (
                            <>
                              <Eye aria-hidden className="h-5 w-5" />
                              <span className="sr-only">Show</span>
                            </>
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormDescription className="text-right">
                      Forgot your password?{" "}
                      <Link
                        href="/reset-password/request"
                        className="font-semibold leading-6 text-primary underline-offset-2 hover:underline"
                      >
                        Reset password
                      </Link>
                      .
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isLoading}
                type="submit"
                className="w-full uppercase shadow-md"
              >
                {isLoading ? (
                  <div className="flex">
                    <Loader2 className="mr-2 size-5 animate-spin" />
                    Loading...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold leading-6 text-primary underline-offset-2 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden flex-1 bg-[url('/assets/home/dashboard.png')] bg-cover dark:bg-[url('/assets/home/dashboard.dark.png')] lg:block">
        <div className="pointer-events-none absolute inset-x-0 left-0 h-full w-32 bg-gradient-to-r from-background" />
      </div>
    </div>
  )
}

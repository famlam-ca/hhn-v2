"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { signUp } from "@/actions/auth"
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
import { SignUpSchema1, SignUpSchema2 } from "@/validators/auth"

export const SignUpForm = () => {
  const router = useRouter()

  const [step, setStep] = useState<number>(1)
  const [step1Values, setStep1Values] = useState<
    Partial<z.infer<typeof SignUpSchema1>>
  >({})
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfPassword, setShowConfPassword] = useState<boolean>(false)

  const togglePassword = () => setShowPassword(!showPassword)
  const toggleConfPassword = () => setShowConfPassword(!showConfPassword)

  type FormValues = z.infer<typeof SignUpSchema1> &
    z.infer<typeof SignUpSchema2>

  const form = useForm<FormValues>({
    resolver: zodResolver(step === 1 ? SignUpSchema1 : SignUpSchema2),
    defaultValues: {
      display_name: "",
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  })

  const isLoading = form.formState.isSubmitting
  const username = form.watch("display_name").toLowerCase()

  const onSubmit = async (values: FormValues) => {
    if (step === 1) {
      values.username = values.display_name.toLowerCase()

      setStep1Values(values)
      setStep(2)
    } else if (step === 2) {
      const allValues = { ...step1Values, ...values }

      const res = await signUp(allValues)
      if (!res.success) {
        toast.error(res.message, {
          action: res.action && {
            label: res.action.message,
            onClick: () => router.push(res.action.href),
          },
        })
      } else if (res.success) {
        router.push("/verify-email?email=" + values.email)
      }
    }
  }

  const styles = {
    input:
      "border-0 bg-background/50 ring-1 ring-input placeholder:text-muted-foreground focus-visible:ring-primary",
  }

  return (
    <div className="relative flex h-full">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="mx-auto mb-10 flex items-center justify-center">
          <Icons.icon noAmimation />

          <h1 className="text-center text-3xl font-bold leading-9 tracking-tight md:text-4xl lg:text-5xl">
            Sign Up
          </h1>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 ? (
                <>
                  <FormField
                    control={form.control}
                    name="display_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Display Name"
                            {...field}
                            className={styles.input}
                          />
                        </FormControl>
                        <FormDescription>
                          This is your publicly visible display name. Your can
                          change this later.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        type="text"
                        placeholder="username"
                        value={username}
                        className={styles.input}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your unique username. It cannot be changed after
                      you create your account.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              ) : null}

              {step === 2 ? (
                <>
                  <Button
                    onClick={() => setStep(1)}
                    variant="ghost"
                    className="absolute left-10 top-10 text-muted-foreground"
                  >
                    <ChevronLeft aria-hidden className="-ml-2 h-5 w-5" />
                    Back
                  </Button>

                  <div className="flex justify-between gap-4">
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="John"
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
                      name="last_name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Doe"
                              {...field}
                              className={styles.input}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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

                  <div className="flex justify-between gap-4">
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="passwordConfirm"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showConfPassword ? "text" : "password"}
                                placeholder="********"
                                {...field}
                                className={styles.input}
                              />
                              <button
                                onClick={toggleConfPassword}
                                type="button"
                                tabIndex={-1}
                                className="absolute right-2 top-[25%]"
                              >
                                {showConfPassword ? (
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              ) : null}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full uppercase shadow-md"
              >
                {isLoading ? (
                  <div className="flex">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Loading...
                  </div>
                ) : (
                  { step: "Next", 2: "Sign Up" }[step] || "Next"
                )}
              </Button>
            </form>
          </Form>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold leading-6 text-primary underline-offset-2 hover:underline"
            >
              Sign In!
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

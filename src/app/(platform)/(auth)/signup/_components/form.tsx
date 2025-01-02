"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeft, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { FloatingLabelInput } from "@/components/ui/floating-label-input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { LoadingButton } from "@/components/ui/loading-button"

import { signUp } from "../actions"
import { SignUpSchema1, SignUpSchema2 } from "../schema"

export function SignUpForm() {
  const router = useRouter()

  const [step, setStep] = useState<number>(1)
  const [step1Values, setStep1Values] = useState<
    Partial<z.infer<typeof SignUpSchema1>>
  >({})
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPasswordConf, setShowPasswordConf] = useState<boolean>(false)

  const togglePassword = () => setShowPassword(!showPassword)
  const togglePasswordConf = () => setShowPasswordConf(!showPasswordConf)

  type FormValues = z.infer<typeof SignUpSchema1> &
    z.infer<typeof SignUpSchema2>

  const form = useForm<FormValues>({
    resolver: zodResolver(step === 1 ? SignUpSchema1 : SignUpSchema2),
    defaultValues: {
      displayName: "",
      name: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  })

  const isLoading = form.formState.isSubmitting
  const name = form.watch("displayName").toLowerCase()

  const onSubmit = async (values: FormValues) => {
    if (step === 1) {
      values.name = values.displayName.toLowerCase()

      setStep1Values(values)
      setStep(2)
    } else if (step === 2) {
      const allValues = { ...step1Values, ...values }

      const res = await signUp(allValues)
      if (!res.success) {
        toast.error(res.message, {
          position: "bottom-left",
          action: res.key === "email_taken" && {
            label: "Sign In",
            onClick: () => window.location.assign("/signin"),
          },
        })
      } else {
        router.push("/verify-email")
      }
    }
  }

  const styles = {
    input:
      "border-0 bg-background/50 ring-1 ring-input focus-visible:ring-primary",
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 ? (
          <>
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      autoFocus
                      type="text"
                      label="Display Name"
                      className={styles.input}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your publicly visible display name. Your can change
                    this later.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  disabled
                  type="text"
                  label="username"
                  defaultValue={name}
                  className={styles.input}
                />
              </FormControl>
              <FormDescription>
                This is your unique username. It cannot be changed after you
                create your account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <div className="flex justify-between gap-x-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <FloatingLabelInput
                        {...field}
                        autoFocus
                        type="text"
                        label="First Name"
                        className={styles.input}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <FloatingLabelInput
                        {...field}
                        type="text"
                        label="Last Name"
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
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      type="email"
                      label="Email"
                      className={styles.input}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between gap-x-4">
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
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="relative">
                      <FormControl>
                        <FloatingLabelInput
                          {...field}
                          type={showPasswordConf ? "text" : "password"}
                          label="Confirm Password"
                          className={styles.input}
                        />
                      </FormControl>
                      <button
                        onClick={togglePasswordConf}
                        type="button"
                        tabIndex={-1}
                        className="absolute right-2 top-[25%]"
                      >
                        {showPasswordConf ? (
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
            </div>

            <Button
              type="button"
              onClick={() => setStep(1)}
              variant="ghost"
              className="absolute -top-2 left-auto right-8 text-muted-foreground lg:-top-[75px] lg:left-4 lg:right-auto"
            >
              <ChevronLeft aria-hidden className="-ml-2 size-5" />
              Back
            </Button>
          </>
        ) : null}

        <LoadingButton
          loading={isLoading}
          type="submit"
          className="w-full uppercase shadow-md"
        >
          {step === 1 ? "Next" : "Sign Up"}
        </LoadingButton>
      </form>
    </Form>
  )
}

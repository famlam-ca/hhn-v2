"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { FloatingLabelInput } from "@/components/ui/floating-label-input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

const Schema = z.object({
  email: z.string().email(),
})

export function FooterForm() {
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: "",
    },
  })

  // TODO: Implement the actual subscription logic
  const onSubmit = (values: z.infer<typeof Schema>) => {
    console.log(values)
    toast.success("This feature is not ready yet.", {
      description:
        "If you are still interested, please sign up using the waitlist.",
      duration: 5000,
      action: {
        label: "Join waitlist",
        onClick: () => {
          window.open("https://www.famlam.ca", "_blank")
        },
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  {...field}
                  type="email"
                  label="Enter your email"
                  className="h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="mt-3">
          Subscribe
        </Button>
      </form>
    </Form>
  )
}

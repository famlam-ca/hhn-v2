import { Slot } from "@radix-ui/react-slot"
import { Loader2 } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

import { ButtonProps, buttonVariants } from "./button"

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    { className, variant, size, asChild = false, loading, children, ...props },
    ref,
  ) => {
    if (asChild) {
      return (
        <Slot ref={ref} {...props}>
          <>
            {React.Children.map(
              children as React.ReactElement,
              (child: React.ReactElement) => {
                return React.cloneElement(child, {
                  className: cn(buttonVariants({ variant, size }), className),
                  children: (
                    <>
                      {loading && (
                        <Loader2
                          className={cn(
                            "h-4 w-4 animate-spin",
                            children && "mr-2",
                          )}
                        />
                      )}
                      {child.props.children}
                    </>
                  ),
                })
              },
            )}
          </>
        </Slot>
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={loading}
        ref={ref}
        {...props}
      >
        <>
          {loading && (
            <Loader2
              className={cn("h-4 w-4 animate-spin", children && "mr-2")}
            />
          )}
          {children}
        </>
      </button>
    )
  },
)
LoadingButton.displayName = "LoadingButton"

export { buttonVariants, LoadingButton }

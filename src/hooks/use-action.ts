import { useState } from "react"

export type ActionResponse<TData = object> = {
  data?: TData
  error?: string
}

interface ActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void
  onError?: (error: string) => void
  onComplete?: () => void
}

export const useAction = <TInput, TOutput>(
  action: (data: TInput) => Promise<ActionResponse<TOutput>>,
) => {
  const [isLoading, setIsLoading] = useState(false)

  const execute = async (input: TInput, options?: ActionOptions<TOutput>) => {
    try {
      setIsLoading(true)
      const response = await action(input)

      if (response.data) {
        options?.onSuccess?.(response.data as TOutput)
      } else {
        options?.onError?.(response.error ?? "An unexpected error occurred")
      }

      return response
    } catch (error) {
      options?.onError?.(
        error instanceof Error ? error.message : "Something went wrong",
      )
      return {
        success: false,
        error: "An unexpected error occurred",
      }
    } finally {
      setIsLoading(false)
      options?.onComplete?.()
    }
  }

  return {
    execute,
    isLoading,
  }
}

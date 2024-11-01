import { createApi } from "unsplash-js"

import { env } from "@/env"

export const unsplash = createApi({
  accessKey: env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  fetch: fetch,
})

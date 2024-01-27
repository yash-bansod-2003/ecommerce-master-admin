import * as z from "zod"

export const billboardSchema = z.object({
      label: z.string().min(3).max(32),
      image: z.string().min(3).max(200)
})
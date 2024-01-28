import * as z from "zod"

export const categorySchema = z.object({
      name: z.string().min(3).max(32),
      billboardId: z.string().min(3)
})
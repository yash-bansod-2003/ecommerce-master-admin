import * as z from "zod";

export const sizeSchema = z.object({
    name: z.string().min(3).max(32),
    value: z.string().min(1).max(10),
});

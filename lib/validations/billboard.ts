import * as z from "zod";

export const billboardSchema = z.object({
    label: z.string().min(3).max(32),
    image: z.string().min(3).max(200),
});

export const billboardEditSchema = z.object({
    label: z.string().min(3).max(32).optional(),
    image: z.string().min(3).max(200).optional(),
});

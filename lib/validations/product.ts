import * as z from "zod";

export const productSchema = z.object({
    name: z.string().min(1).max(25),
    image: z.string().min(1),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
});

export const productEditSchema = z.object({
    name: z.string().min(1).max(25).optional(),
    image: z.string().min(1).optional(),
    price: z.coerce.number().min(1).optional(),
    categoryId: z.string().min(1).optional(),
    colorId: z.string().min(1).optional(),
    sizeId: z.string().min(1).optional(),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
});

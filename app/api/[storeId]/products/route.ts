import { auth } from "@clerk/nextjs";
import * as z from "zod";
import { NextResponse } from "next/server";
import { productSchema } from "@/lib/validations/product";

import { db } from "@/lib/db";

const routeContextSchema = z.object({
    params: z.object({
        storeId: z.string(),
    }),
});

export async function POST(
    req: Request,
    context: z.infer<typeof routeContextSchema>,
) {
    try {
        // Validate the route context.
        const { params } = routeContextSchema.parse(context);

        // Ensure user is authentication and has access to this user.
        const { userId } = auth();

        if (!userId) {
            return new Response(null, { status: 403 });
        }

        // Get the request body and validate it.
        const body = await req.json();
        const payload = productSchema.parse(body);

        // Create the size.
        const dbProduct = await db.product.create({
            data: {
                userId,
                storeId: params.storeId,
                name: payload.name,
                price: payload.price,
                image: payload.image,
                isArchived: payload.isArchived,
                isFeatured: payload.isFeatured,
                categoryId: payload.categoryId,
                sizeId: payload.sizeId,
                colorId: payload.colorId,
            },
        });

        return NextResponse.json({ ...dbProduct }, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(JSON.stringify(error.issues), {
                status: 422,
            });
        }

        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
}

export async function GET(
    req: Request,
    context: z.infer<typeof routeContextSchema>,
) {
    try {
        // Validate the route context.
        const { params } = routeContextSchema.parse(context);

        // Create the billboard.
        const dbProducts = await db.product.findMany({
            where: {
                storeId: params.storeId,
            },
        });

        return NextResponse.json({ ...dbProducts }, { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
}

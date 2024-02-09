import { auth } from "@clerk/nextjs";
import { z } from "zod";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { productSchema, productEditSchema } from "@/lib/validations/product";

const routeContextSchema = z.object({
    params: z.object({
        storeId: z.string(),
        productId: z.string(),
    }),
});

export async function GET(
    req: Request,
    context: z.infer<typeof routeContextSchema>,
) {
    try {
        // Validate the route context.
        const { params } = routeContextSchema.parse(context);

        // fetch the unique size.
        const dbProduct = await db.product.findUnique({
            where: {
                id: params.productId,
                storeId: params.storeId,
            },
        });

        return NextResponse.json(dbProduct, { status: 200 });
    } catch (error) {
        return new NextResponse(null, { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    context: z.infer<typeof routeContextSchema>,
) {
    try {
        // Validate the route context.
        const { params } = routeContextSchema.parse(context);

        // Ensure user is authentication and has access to this user.
        const { userId } = auth();
        if (!userId) {
            return new NextResponse(null, { status: 403 });
        }

        // Get the request body and validate it.
        const body = await req.json();
        const payload = productEditSchema.parse(body);

        // Update the product.
        const dbUpdatedProduct = await db.product.update({
            where: {
                id: params.productId,
                storeId: params.storeId,
                userId,
            },
            data: {
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

        return NextResponse.json(dbUpdatedProduct, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(JSON.stringify(error.issues), {
                status: 422,
            });
        }

        return new NextResponse(null, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    context: z.infer<typeof routeContextSchema>,
) {
    try {
        // Validate the route context.
        const { params } = routeContextSchema.parse(context);

        // Ensure user is authentication and has access to this user.
        const { userId } = auth();
        if (!userId) {
            return new NextResponse(null, { status: 403 });
        }

        // delete the product.
        await db.product.delete({
            where: {
                id: params.productId,
                storeId: params.storeId,
                userId,
            },
        });

        return new NextResponse(null, { status: 200 });
    } catch (error) {
        return new NextResponse(null, { status: 500 });
    }
}

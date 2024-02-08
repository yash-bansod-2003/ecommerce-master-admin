import { auth } from "@clerk/nextjs";
import { z } from "zod";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sizeSchema } from "@/lib/validations/size";

const routeContextSchema = z.object({
    params: z.object({
        storeId: z.string(),
        sizeId: z.string(),
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
        const dbSize = await db.size.findUnique({
            where: {
                id: params.sizeId,
                storeId: params.storeId,
            },
        });

        return NextResponse.json({ ...dbSize }, { status: 200 });
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
        const payload = sizeSchema.parse(body);

        // Update the billboard.
        await db.size.update({
            where: {
                id: params.sizeId,
                storeId: params.storeId,
                userId,
            },
            data: {
                name: payload.name,
                value: payload.value,
            },
        });

        return new NextResponse(null, { status: 200 });
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

        // delete the size.
        await db.size.delete({
            where: {
                id: params.sizeId,
                storeId: params.storeId,
                userId,
            },
        });

        return new NextResponse(null, { status: 200 });
    } catch (error) {
        return new NextResponse(null, { status: 500 });
    }
}

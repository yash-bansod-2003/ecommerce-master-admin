import { auth } from "@clerk/nextjs";
import { z } from "zod";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { billboardSchema } from "@/lib/validations/billboard";

const routeContextSchema = z.object({
    params: z.object({
        storeId: z.string(),
        billboardId: z.string(),
    }),
});

export async function GET(
    req: Request,
    context: z.infer<typeof routeContextSchema>,
) {
    try {
        // Validate the route context.
        const { params } = routeContextSchema.parse(context);

        // fetch the billboard.
        const dbBillboard = await db.billboard.findUnique({
            where: {
                id: params.billboardId,
                storeId: params.storeId,
            },
        });

        return NextResponse.json({ ...dbBillboard }, { status: 200 });
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
        const payload = billboardSchema.parse(body);

        // Update the billboard.
        await db.billboard.update({
            where: {
                id: params.billboardId,
                storeId: params.storeId,
                userId,
            },
            data: {
                label: payload.label,
                image: payload.image,
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

        // delete the billboard.
        await db.billboard.delete({
            where: {
                id: params.billboardId,
                storeId: params.storeId,
                userId,
            },
        });

        return new NextResponse(null, { status: 200 });
    } catch (error) {
        return new NextResponse(null, { status: 500 });
    }
}

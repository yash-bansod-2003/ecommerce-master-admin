import { auth } from "@clerk/nextjs";
import * as z from "zod";
import { NextResponse } from "next/server";
import { billboardSchema } from "@/lib/validations/billboard";

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
        const payload = billboardSchema.parse(body);

        // Create the billboard.
        const dbBillboard = await db.billboard.create({
            data: {
                userId,
                storeId: params.storeId,
                label: payload.label,
                image: payload.image,
            },
        });

        return NextResponse.json(dbBillboard, { status: 201 });
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
        const dbBillboards = await db.billboard.findMany({
            where: {
                storeId: params.storeId,
            },
        });

        return NextResponse.json(dbBillboards, { status: 201 });
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
}

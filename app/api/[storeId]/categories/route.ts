import { auth } from "@clerk/nextjs";
import * as z from "zod";
import { NextResponse } from "next/server";
import { categorySchema } from "@/lib/validations/category";

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
        const payload = categorySchema.parse(body);

        // Create the billboard.
        const dbCategory = await db.category.create({
            data: {
                name: payload.name,
                userId,
                storeId: params.storeId,
                billboardId: payload.billboardId,
            },
        });

        return NextResponse.json(dbCategory, { status: 201 });
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

        // fetch the categories.
        const dbCategories = await db.category.findMany({
            where: {
                storeId: params.storeId,
            },
        });

        return NextResponse.json(dbCategories, { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
}

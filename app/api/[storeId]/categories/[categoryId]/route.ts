import { auth } from "@clerk/nextjs"
import { z } from "zod"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { categorySchema } from "@/lib/validations/category"

const routeContextSchema = z.object({
      params: z.object({
            storeId: z.string(),
            categoryId: z.string()
      }),
})

export async function GET(
      req: Request,
      context: z.infer<typeof routeContextSchema>
) {
      try {
            // Validate the route context.
            const { params } = routeContextSchema.parse(context)

            // fetch the category.
            const dbCategory = await db.billboard.findUnique({
                  where: {
                        id: params.categoryId,
                        storeId: params.storeId,
                  }
            })

            return NextResponse.json({ ...dbCategory }, { status: 200 })
      } catch (error) {
            return new NextResponse(null, { status: 500 })
      }
}

export async function PATCH(
      req: Request,
      context: z.infer<typeof routeContextSchema>
) {
      try {
            // Validate the route context.
            const { params } = routeContextSchema.parse(context)

            // Ensure user is authentication and has access to this user.
            const { userId } = auth()
            if (!userId) {
                  return new NextResponse(null, { status: 403 })
            }

            // Get the request body and validate it.
            const body = await req.json()
            const payload = categorySchema.parse(body)

            // Update the billboard.
            await db.category.update({
                  where: {
                        id: params.categoryId,
                        storeId: params.storeId,
                        userId
                  },
                  data: {
                        name: payload.name,
                        billboardId: payload.billboardId
                  },
            })

            return new NextResponse(null, { status: 200 })
      } catch (error) {
            if (error instanceof z.ZodError) {
                  return new NextResponse(JSON.stringify(error.issues), { status: 422 })
            }

            return new NextResponse(null, { status: 500 })
      }
}

export async function DELETE(
      req: Request,
      context: z.infer<typeof routeContextSchema>
) {
      try {
            // Validate the route context.
            const { params } = routeContextSchema.parse(context)

            // Ensure user is authentication and has access to this user.
            const { userId } = auth()
            if (!userId) {
                  return new NextResponse(null, { status: 403 })
            }

            // delete the billboard.
            await db.billboard.delete({
                  where: {
                        id: params.categoryId,
                        storeId: params.storeId,
                        userId
                  },
            })

            return new NextResponse(null, { status: 200 })
      } catch (error) {
            return new NextResponse(null, { status: 500 })
      }
}



import { auth } from "@clerk/nextjs"
import { z } from "zod"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { storeNameSchema } from "@/lib/validations/store"

const routeContextSchema = z.object({
      params: z.object({
            storeId: z.string(),
      }),
})

export async function GET(
      req: Request,
      context: z.infer<typeof routeContextSchema>
) {
      try {
            // Validate the route context.
            const { params } = routeContextSchema.parse(context)

            // Delete the store.
            const dbStore = await db.store.findUnique({
                  where: {
                        id: params.storeId,
                  },
            })

            return NextResponse.json({ ...dbStore }, { status: 200 })
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
            const payload = storeNameSchema.parse(body)

            // Update the store.
            await db.store.update({
                  where: {
                        id: params.storeId,
                        userId
                  },
                  data: {
                        name: payload.name,
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

            // Delete the store.
            await db.store.delete({
                  where: {
                        id: params.storeId,
                        userId
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
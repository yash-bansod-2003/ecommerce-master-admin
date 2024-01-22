import { currentUser } from "@clerk/nextjs"
import * as z from "zod"
import { NextResponse } from "next/server"

import { db } from "@/lib/db"

const formSchema = z.object({
      name: z.string().min(2).max(50),
})

export async function POST(
      req: Request
) {
      try {

            // Ensure user is authentication and has access to this user.
            const user = await currentUser();

            if (!user) {
                  return new Response(null, { status: 403 })
            }

            // Get the request body and validate it.
            const body = await req.json()
            const payload = formSchema.parse(body)

            // Create the store.
            const dbStore = await db.store.create({
                  data: {
                        userId: user.id,
                        name: payload.name,
                  },
            })

            return NextResponse.json({ ...dbStore }, { status: 201 })
      } catch (error) {
            if (error instanceof z.ZodError) {
                  return new NextResponse(JSON.stringify(error.issues), { status: 422 })
            }

            return new NextResponse(null, { status: 500 })
      }
}
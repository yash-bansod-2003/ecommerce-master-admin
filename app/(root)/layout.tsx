import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

interface RootLayoutProps {
      children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
      const { userId } = await auth();

      if (!userId) {
            redirect("/sign-in")
      }

      const dbStore = await db.store.findFirst({
            where: {
                  userId
            }
      });

      if (dbStore) {
            redirect(`/${dbStore.id}`)
      }

      return <div className="min-h-screen flex items-center justify-center">{children}</div>
}
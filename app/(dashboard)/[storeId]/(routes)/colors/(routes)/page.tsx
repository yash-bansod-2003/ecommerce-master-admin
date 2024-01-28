import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { ColorClient } from "@/components/dashboard/color/client"
import { db } from "@/lib/db"

export const metadata = {
      title: "Colors",
      description: "Manage ans Customize colors.",
}


interface ColorsPageProps {
      params: {
            storeId: string
      }
}

const ColorsPage: React.FC<ColorsPageProps> = async ({ params }) => {

      const { userId } = auth()

      if (!userId) {
            return redirect("/sign-in")
      }

      const colors = await db.color.findMany({
            where: {
                  storeId: params.storeId
            }
      });

      return <ColorClient colors={colors} />
}

export default ColorsPage;
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { BillboardClient } from "@/components/dashboard/billboard/client"
import { db } from "@/lib/db"

export const metadata = {
      title: "Billboards",
      description: "Revolutionize your brand visibility with easy billboard customization.",
}


interface BillboardsPageProps {
      params: {
            storeId: string
      }
}

const BillboardsPage: React.FC<BillboardsPageProps> = async ({ params }) => {

      const { userId } = auth()

      if (!userId) {
            return redirect("/sign-in")
      }

      const billboards = await db.billboard.findMany({
            where: {
                  storeId: params.storeId
            }
      });

      return <BillboardClient billboards={billboards} />
}

export default BillboardsPage;
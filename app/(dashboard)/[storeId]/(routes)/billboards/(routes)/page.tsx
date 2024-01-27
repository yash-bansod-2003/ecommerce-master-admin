import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { BillboardClient } from "../components/client"
import { BillboardColumn } from "../components/columns"
import { db } from "@/lib/db"

export const metadata = {
      title: "Billboards",
      description: "Manage billboards and billboards settings.",
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

      return <BillboardClient billbaords={billboards} />
}

export default BillboardsPage;
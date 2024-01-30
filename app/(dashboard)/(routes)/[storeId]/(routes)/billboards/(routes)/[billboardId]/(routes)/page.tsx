import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { db } from "@/lib/db"
import { BillboardForm } from "../_components/form"

export const metadata = {
      title: "Billboard",
      description: "billboard customization.",
}

interface BillboardPageProps {
      params: {
            storeId: string,
            billboardId: string
      }
}

const BillboardsPage: React.FC<BillboardPageProps> = async ({ params }) => {

      const { userId } = auth()


      if (!userId) {
            return redirect("/sign-in")
      }

      const billboard = await db.billboard.findUnique({
            where: {
                  id: params.billboardId
            }
      });


      return (
            <DashboardShell>
                  <DashboardHeader
                        heading="Billboard"
                        text="Manage billboard at one place."
                  />
                  <div className="grid gap-10">
                        <BillboardForm billboard={billboard} storeId={params.storeId} />
                  </div>
            </DashboardShell>
      )
}

export default BillboardsPage;
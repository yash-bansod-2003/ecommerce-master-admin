import { ObjectId } from 'mongodb';
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { db } from "@/lib/db"
import { BillboardForm } from "@/components/forms/billboard-form"

export const metadata = {
      title: "Billboards",
      description: "Manage billboards and billboards settings.",
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

      // temporary fix of mongodb hex string error
      const dummyObjectId = new ObjectId();

      const billboard = await db.billboard.findUnique({
            where: {
                  id: params.billboardId === "new" ? dummyObjectId : params.billboardId,
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
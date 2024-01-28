import { ObjectId } from 'mongodb';
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { db } from "@/lib/db"
import { SizeForm } from "@/components/forms/size-form"
import { SizeDeleteButton } from '@/components/size-delete-button';
import { Icons } from '@/components/icons';

export const metadata = {
      title: "Sizes",
      description: "Manage sizes and sizes settings.",
}

interface SizePageProps {
      params: {
            storeId: string,
            sizeId: string
      }
}

const SizePage: React.FC<SizePageProps> = async ({ params }) => {

      const { userId } = auth()


      if (!userId) {
            return redirect("/sign-in")
      }

      // temporary fix of mongodb hex string error
      const dummyObjectId = new ObjectId();

      const size = await db.size.findUnique({
            where: {
                  id: params.sizeId === "new" ? dummyObjectId : params.sizeId,
            }
      });


      return (
            <DashboardShell>
                  <DashboardHeader
                        heading="Sizes"
                        text="Manage sizes at one place."
                  >
                        {
                              params.sizeId !== "new" && (
                                    <SizeDeleteButton
                                          storeId={params.storeId}
                                          sizeId={params.sizeId}
                                          variant="destructive"
                                          size="icon"
                                    >
                                          <Icons.trash />
                                    </SizeDeleteButton>
                              )
                        }
                  </DashboardHeader>
                  <div className="grid gap-10">
                        <SizeForm size={size} storeId={params.storeId} />
                  </div>
            </DashboardShell>
      )
}

export default SizePage;
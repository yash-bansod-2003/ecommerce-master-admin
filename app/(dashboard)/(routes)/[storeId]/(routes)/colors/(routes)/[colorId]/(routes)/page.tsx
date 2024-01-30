import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { db } from "@/lib/db"
import { ColorForm } from "../_components/form"
import { ColorDeleteButton } from '../../../_components/remove-button';
import { Icons } from '@/components/icons';

export const metadata = {
      title: "Color",
      description: "personalize your color preferences",
}

interface ColorPageProps {
      params: {
            storeId: string,
            colorId: string
      }
}

const ColorPage: React.FC<ColorPageProps> = async ({ params }) => {

      const { userId } = auth()


      if (!userId) {
            return redirect("/sign-in")
      }


      let color = await db.color.findUnique({
            where: {
                  id: params.colorId,
            }
      });


      return (
            <DashboardShell>
                  <DashboardHeader
                        heading="Colors"
                        text="Color your world: Effortlessly customize and manage your color choices here."
                  >
                        {
                              params.colorId !== "new" && (
                                    <ColorDeleteButton
                                          storeId={params.storeId}
                                          colorId={params.colorId}
                                          variant="destructive"
                                          size="icon"
                                    >
                                          <Icons.trash />
                                    </ColorDeleteButton>
                              )
                        }
                  </DashboardHeader>
                  <div className="grid gap-10">
                        <ColorForm
                              color={color}
                              storeId={params.storeId}
                        />
                  </div>
            </DashboardShell>
      )
}

export default ColorPage;
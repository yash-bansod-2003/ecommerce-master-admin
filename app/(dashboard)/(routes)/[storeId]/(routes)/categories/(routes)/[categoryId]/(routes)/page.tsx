import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { db } from "@/lib/db"
import { CategoryForm } from "../_components/form"
import { CategoryDeleteButton } from '../../../_components/remove-button';
import { Icons } from '@/components/icons';

export const metadata = {
      title: "Category",
      description: "Manage category and category settings.",
}

interface CategoryPageProps {
      params: {
            storeId: string,
            categoryId: string
      }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {

      const { userId } = auth()


      if (!userId) {
            return redirect("/sign-in")
      }


      const category = await db.category.findUnique({
            where: {
                  id: params.categoryId,
            }
      });

      const billboards = await db.billboard.findMany({
            where: {
                  userId,
                  storeId: params.storeId
            }
      })

      return (
            <DashboardShell>
                  <DashboardHeader
                        heading="Category"
                        text="Discover and tweak your category settings with ease."
                  >
                        {params.categoryId !== "new" && (
                              <CategoryDeleteButton
                                    storeId={params.storeId}
                                    categoryId={params.categoryId}
                                    variant="destructive"
                                    size="icon"
                              >
                                    <Icons.trash />
                              </CategoryDeleteButton>
                        )}
                  </DashboardHeader>
                  <div className="grid gap-10">
                        <CategoryForm
                              category={category}
                              billboards={billboards}
                              storeId={params.storeId}
                        />
                  </div>
            </DashboardShell>
      )
}

export default CategoryPage;
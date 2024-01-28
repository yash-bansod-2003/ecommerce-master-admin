import { ObjectId } from 'mongodb';
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { db } from "@/lib/db"
import { CategoryForm } from "@/components/forms/category-form"
import { CategoryDeleteButton } from '@/components/category-delete-button';
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

      // temporary fix of mongodb hex string error
      const dummyObjectId = new ObjectId();

      const category = await db.category.findUnique({
            where: {
                  id: params.categoryId === "new" ? dummyObjectId : params.categoryId,
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
                        heading="Categories"
                        text="Manage categories at one place."
                  >
                        <CategoryDeleteButton
                              storeId={params.storeId}
                              categoryId={params.categoryId}
                              variant="destructive"
                              size="icon"
                        >
                              <Icons.trash />
                        </CategoryDeleteButton>
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
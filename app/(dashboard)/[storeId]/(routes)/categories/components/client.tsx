"use client"

import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { Button } from "@/components/ui/button"
import { CategoryDataTable } from "./data-table"
import { columns } from "./columns"
import { Clipboard } from '@/components/clipboard'
import { useRouter, useParams } from "next/navigation"
import { useOrigin } from "@/hooks/use-origin"

interface CategoryClientProps {
      categories: Array<any>
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ categories }) => {
      const params = useParams();
      const router = useRouter();
      const { origin } = useOrigin();

      return (
            <DashboardShell>
                  <DashboardHeader
                        heading="Categories"
                        text="Manage categories and Category at one place."
                  >
                        <Button
                              onClick={() => router.push(`/${params.storeId}/categories/new`)}
                        >
                              <Icons.add className="h-4 w-4 mr-2" />
                              Add New
                        </Button>
                  </DashboardHeader>
                  <div className="grid gap-10">
                        <CategoryDataTable columns={columns} data={categories} />
                        <div className="grid gap-4">
                              <Clipboard
                                    text={`${origin}/api/${params.storeId}/categories`}
                              />
                              <Clipboard
                                    text={`${origin}/api/${params.storeId}/categories/{categoryId}`}
                              />
                              <Clipboard
                                    badge="admin"
                                    request="POST"
                                    text={`${origin}/api/${params.storeId}/categories/{categoryId}`}
                              />
                              <Clipboard
                                    badge="admin"
                                    request="PATCH"
                                    text={`${origin}/api/${params.storeId}/categories/{categoryId}`}
                              />
                              <Clipboard
                                    badge="admin"
                                    request="DELETE"
                                    text={`${origin}/api/${params.storeId}/categories/{categoryId}`}
                              />
                        </div>
                  </div>
            </DashboardShell>
      )
}
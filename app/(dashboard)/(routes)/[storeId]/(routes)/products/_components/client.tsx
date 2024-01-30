"use client"

import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { columns, ProductColumn } from "./column"
import { Clipboard } from '@/components/clipboard'
import { useRouter, useParams } from "next/navigation"
import { cn } from "@/lib/utils"

type ProductsClientProps = React.HTMLAttributes<HTMLDivElement> & {
      products: Array<ProductColumn>
}

const ProductsClient: React.FC<ProductsClientProps> = ({ products, className, ...props }) => {
      const params = useParams();
      const router = useRouter();

      return (
            <DashboardShell>
                  <DashboardHeader
                        heading="Products"
                        text="Manage and customize your products at one place."
                  >
                        <Button
                              onClick={() => router.push(`/${params.storeId}/products/new`)}
                        >
                              <Icons.add className="h-4 w-4 mr-2" />
                              Add New
                        </Button>
                  </DashboardHeader>
                  <div className={cn("grid gap-10", className)} {...props}>
                        <DataTable columns={columns} data={products} filterKey="name" />
                        <div className="grid gap-4">
                              <Clipboard
                                    text={`/api/${params.storeId}/products`}
                              />
                              <Clipboard
                                    text={`/api/${params.storeId}/products/{productId}`}
                              />
                              <Clipboard
                                    badge="admin"
                                    request="POST"
                                    text={`/api/${params.storeId}/products/{productId}`}
                              />
                              <Clipboard
                                    badge="admin"
                                    request="PATCH"
                                    text={`/api/${params.storeId}/products/{productId}`}
                              />
                              <Clipboard
                                    badge="admin"
                                    request="DELETE"
                                    text={`/api/${params.storeId}/products/{productId}`}
                              />
                        </div>
                  </div>
            </DashboardShell>
      )
}

export { ProductsClient }
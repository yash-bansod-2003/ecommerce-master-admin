"use client"

import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { Button } from "@/components/ui/button"
import { SizeDataTable } from "./data-table"
import { columns } from "./columns"
import { Clipboard } from '@/components/clipboard'
import { useRouter, useParams } from "next/navigation"
import { useOrigin } from "@/hooks/use-origin"
import { Size } from "@prisma/client"

interface SizeClientProps {
      sizes: Array<Size>
}

export const SizeClient: React.FC<SizeClientProps> = ({ sizes }) => {
      const params = useParams();
      const router = useRouter();
      const { origin } = useOrigin();

      return (
            <DashboardShell>
                  <DashboardHeader
                        heading="Sizes"
                        text="Manage sizes one place."
                  >
                        <Button
                              onClick={() => router.push(`/${params.storeId}/sizes/new`)}
                        >
                              <Icons.add className="h-4 w-4 mr-2" />
                              Add New
                        </Button>
                  </DashboardHeader>
                  <div className="grid gap-10">
                        <SizeDataTable columns={columns} data={sizes} />
                        <div className="grid gap-4">
                              <Clipboard
                                    text={`${origin}/api/${params.storeId}/sizes`}
                              />
                              <Clipboard
                                    text={`${origin}/api/${params.storeId}/sizes/{sizeId}`}
                              />
                              <Clipboard
                                    badge="admin"
                                    request="POST"
                                    text={`${origin}/api/${params.storeId}/sizes/{sizeId}`}
                              />
                              <Clipboard
                                    badge="admin"
                                    request="PATCH"
                                    text={`${origin}/api/${params.storeId}/sizes/{sizeId}`}
                              />
                              <Clipboard
                                    badge="admin"
                                    request="DELETE"
                                    text={`${origin}/api/${params.storeId}/sizes/{sizeId}`}
                              />
                        </div>
                  </div>
            </DashboardShell>
      )
}
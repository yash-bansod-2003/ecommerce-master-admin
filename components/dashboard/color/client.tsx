"use client"

import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { columns } from "@/components/dashboard/color/table/columns"
import { Clipboard } from '@/components/clipboard'
import { useRouter, useParams } from "next/navigation"
import { useOrigin } from "@/hooks/use-origin"
import { Size } from "@prisma/client"

interface ColorClientProps {
      colors: Array<Size>
}

export const ColorClient: React.FC<ColorClientProps> = ({ colors }) => {
      const params = useParams();
      const router = useRouter();
      const { origin } = useOrigin();

      return (
            <DashboardShell>
                  <DashboardHeader
                        heading="Colors"
                        text="Tailor your colors effortlessly."
                  >
                        <Button
                              onClick={() => router.push(`/${params.storeId}/colors/new`)}
                        >
                              <Icons.add className="h-4 w-4 mr-2" />
                              Add New
                        </Button>
                  </DashboardHeader>
                  <div className="grid gap-10">
                        <DataTable columns={columns} data={colors} filterKey="name" />
                        <div className="grid gap-4">
                              <Clipboard
                                    text={`${origin}/api/${params.storeId}/colors`}
                              />
                              <Clipboard
                                    text={`${origin}/api/${params.storeId}/colors/{colorId}`}
                              />
                              <Clipboard
                                    badge="admin"
                                    request="POST"
                                    text={`${origin}/api/${params.storeId}/colors/{colorId}`}
                              />
                              <Clipboard
                                    badge="admin"
                                    request="PATCH"
                                    text={`${origin}/api/${params.storeId}/colors/{colorId}`}
                              />
                              <Clipboard
                                    badge="admin"
                                    request="DELETE"
                                    text={`${origin}/api/${params.storeId}/colors/{colorId}`}
                              />
                        </div>
                  </div>
            </DashboardShell>
      )
}
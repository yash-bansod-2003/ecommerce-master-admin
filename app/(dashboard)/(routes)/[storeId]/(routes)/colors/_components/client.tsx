"use client"

import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { columns } from "./columns"
import { Clipboard } from '@/components/clipboard'
import { useRouter, useParams } from "next/navigation"
import { Color } from "@prisma/client"

interface ColorClientProps {
      colors: Array<Color>
}

export const ColorClient: React.FC<ColorClientProps> = ({ colors }) => {
      const params = useParams();
      const router = useRouter();

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
                                    text={`/api/${params.storeId}/colors`}
                              />
                              <Clipboard
                                    text={`/api/${params.storeId}/colors/{colorId}`}
                              />
                              <Clipboard
                                    badge="admin"
                                    request="POST"
                                    text={`/api/${params.storeId}/colors/{colorId}`}
                              />
                              <Clipboard
                                    badge="admin"
                                    request="PATCH"
                                    text={`/api/${params.storeId}/colors/{colorId}`}
                              />
                              <Clipboard
                                    badge="admin"
                                    request="DELETE"
                                    text={`/api/${params.storeId}/colors/{colorId}`}
                              />
                        </div>
                  </div>
            </DashboardShell>
      )
}
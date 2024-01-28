"use client"

import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { columns } from "./table/columns"
import { Clipboard } from '@/components/clipboard'
import { useRouter, useParams } from "next/navigation"
import { useOrigin } from "@/hooks/use-origin"

interface BillboardClientProps {
      billboards: Array<any>
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ billboards: billboards }) => {
      const params = useParams();
      const router = useRouter();
      const { origin } = useOrigin();

      return (
            <DashboardShell>
                  <DashboardHeader
                        heading="Billboards"
                        text="Revolutionize your brand visibility with easy billboard customization."
                  >
                        <Button
                              onClick={() => router.push(`/${params.storeId}/billboards/new`)}
                        >
                              <Icons.add className="h-4 w-4 mr-2" />
                              Create Billboard
                        </Button>
                  </DashboardHeader>
                  <div className="grid gap-10">
                        <DataTable columns={columns} data={billboards} filterKey="label" />
                        <div className="grid gap-4">
                              <Clipboard
                                    text={`${origin}/api/${params.storeId}/billboards`}
                              />
                              <Clipboard
                                    text={`${origin}/api/${params.storeId}/billboards/{billboardId}`}
                              />
                              <Clipboard
                                    badge="admin"
                                    request="POST"
                                    text={`${origin}/api/${params.storeId}/billboards/{billboardId}`}
                              />
                              <Clipboard
                                    badge="admin"
                                    request="PATCH"
                                    text={`${origin}/api/${params.storeId}/billboards/{billboardId}`}
                              />
                              <Clipboard
                                    badge="admin"
                                    request="DELETE"
                                    text={`${origin}/api/${params.storeId}/billboards/{billboardId}`}
                              />
                        </div>
                  </div>
            </DashboardShell>
      )
}
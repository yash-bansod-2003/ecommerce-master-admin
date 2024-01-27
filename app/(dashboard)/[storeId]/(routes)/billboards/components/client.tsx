"use client"

import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { Button } from "@/components/ui/button"
import { BillboardDataTable } from "./data-table"
import { columns } from "./columns"
import { Clipboard } from '@/components/clipboard'
import { useRouter, useParams } from "next/navigation"
import { useOrigin } from "@/hooks/use-origin"

interface BillboardClientProps {
      billbaords: Array<any>
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ billbaords }) => {
      const params = useParams();
      const router = useRouter();
      const { origin } = useOrigin();

      return (
            <DashboardShell>
                  <DashboardHeader
                        heading="Billboards"
                        text="Manage billboards and billboard at one place."
                  >
                        <Button
                              onClick={() => router.push(`/${params.storeId}/billboards/new`)}
                        >
                              <Icons.add className="h-4 w-4 mr-2" />
                              Create Billboard
                        </Button>
                  </DashboardHeader>
                  <div className="grid gap-10">
                        <BillboardDataTable columns={columns} data={billbaords} />
                        <Clipboard
                              text={`${origin}/api/${params.storeId}/billboards`}
                        />
                  </div>
            </DashboardShell>
      )
}
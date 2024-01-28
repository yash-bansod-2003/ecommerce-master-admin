"use client";

import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BillboardColumn } from "./columns"
import { BillboardDeleteButton } from "@/components/dashboard/billboard/billboard-delete-button";

type BillboardCellActionsProps = {
      data: BillboardColumn
}

const BillboardCellActions: React.FC<BillboardCellActionsProps> = ({ data }) => {
      const router = useRouter();
      const params = useParams<{ storeId: string }>();

      return (
            <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <Icons.more className="h-4 w-4" />
                        </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                              onClick={() => navigator.clipboard.writeText(data.id)}
                        >
                              <Icons.copy className="h-4 w-4 mr-2" />
                              Copy Id
                        </DropdownMenuItem>
                        <DropdownMenuItem
                              onClick={() => {
                                    router.push(`/${params.storeId}/billboards/${data.id}`)
                              }}
                        >
                              <Icons.edit className="h-4 w-4 mr-2" />
                              edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                              <BillboardDeleteButton
                                    storeId={params.storeId}
                                    billboardId={data.id}
                              >
                                    <Icons.trash className="h-4 w-4 mr-2" />
                                    Delete
                              </BillboardDeleteButton>
                        </DropdownMenuItem>
                  </DropdownMenuContent>
            </DropdownMenu>
      )
}

export { BillboardCellActions }
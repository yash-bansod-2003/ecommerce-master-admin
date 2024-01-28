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
import { CategoryColumn } from "./columns"
import { CategoryDeleteButton } from "@/components/dashboard/category/category-delete-button";

type CategoryCellActionsProps = {
      data: CategoryColumn
}

const CategoryCellActions: React.FC<CategoryCellActionsProps> = ({ data }) => {
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
                                    router.push(`/${params.storeId}/categories/${data.id}`)
                              }}
                        >
                              <Icons.edit className="h-4 w-4 mr-2" />
                              edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                              <CategoryDeleteButton
                                    storeId={params.storeId}
                                    categoryId={data.id}
                              >
                                    <Icons.trash className="h-4 w-4 mr-2" />
                                    Delete
                              </CategoryDeleteButton>
                        </DropdownMenuItem>
                  </DropdownMenuContent>
            </DropdownMenu>
      )
}

export { CategoryCellActions }
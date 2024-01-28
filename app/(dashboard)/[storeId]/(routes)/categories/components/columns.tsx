"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CategoryCellActions } from "./category-cell-actions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
      id: string
      name: string
      createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
      {
            accessorKey: "name",
            header: "Name"
      },
      {
            accessorKey: "createdAt",
            header: "Created At"
      },
      {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => <CategoryCellActions data={row.original} />
      },
]

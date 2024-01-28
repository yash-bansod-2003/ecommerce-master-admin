"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ColorCellActions } from "@/components/dashboard/color/table/color-cell-actions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SizeColumn = {
      id: string
      name: string
      value: string
      createdAt: Date
}

export const columns: ColumnDef<SizeColumn>[] = [
      {
            accessorKey: "name",
            header: "Name"
      },
      {
            accessorKey: "value",
            header: "Value"
      },
      {
            accessorKey: "createdAt",
            header: "Created At"
      },
      {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => <ColorCellActions data={row.original} />
      },
]

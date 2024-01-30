"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ProductCellActions } from "./cell-actions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
      id: string
      name: string
      price: string
      isFeatured: boolean
      isArchived: boolean
      category: string
      size: string
      color: string
      createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
      {
            accessorKey: "name",
            header: "Name",
      },
      {
            accessorKey: "isArchived",
            header: "Archived",
      },
      {
            accessorKey: "isFeatured",
            header: "Featured",
      },
      {
            accessorKey: "price",
            header: "Price",
      },
      {
            accessorKey: "size",
            header: "Size",
      },
      {
            accessorKey: "color",
            header: "Color",
            cell: ({ row }) => (
                  <div className="flex items-center gap-4">
                        <div className="p-3 border-4 rounded-full" style={{ backgroundColor: row.original.color }} />
                        {row.original.color}
                  </div>
            )
      },
      {
            accessorKey: "category",
            header: "Category",
      },
      {
            accessorKey: "createdAt",
            header: "Date",
      },
      {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => <ProductCellActions data={row.original} />
      },
]

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BillboardCellActions } from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
    id: string;
    label: string;
    createdAt: Date;
};

export const columns: ColumnDef<BillboardColumn>[] = [
    {
        accessorKey: "label",
        header: "Label",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <BillboardCellActions data={row.original} />,
    },
];

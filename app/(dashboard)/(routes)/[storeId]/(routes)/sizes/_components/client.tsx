"use client";

import { DashboardHeader } from "@/components/header";
import { Icons } from "@/components/icons";
import { DashboardShell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { Clipboard } from "@/components/clipboard";
import { useRouter, useParams } from "next/navigation";
import { Size } from "@prisma/client";

interface SizeClientProps {
    sizes: Array<Size>;
}

export const SizeClient: React.FC<SizeClientProps> = ({ sizes }) => {
    const params = useParams();
    const router = useRouter();

    return (
        <DashboardShell>
            <DashboardHeader
                heading="Sizes"
                text="Tailor your sizes effortlessly: Customize and manage size options hassle-free."
            >
                <Button
                    onClick={() => router.push(`/${params.storeId}/sizes/new`)}
                >
                    <Icons.add className="h-4 w-4 mr-2" />
                    Add New
                </Button>
            </DashboardHeader>
            <div className="grid gap-10">
                <DataTable columns={columns} data={sizes} filterKey="name" />
                <div className="grid gap-4">
                    <Clipboard text={`/api/${params.storeId}/sizes`} />
                    <Clipboard text={`/api/${params.storeId}/sizes/{sizeId}`} />
                    <Clipboard
                        badge="admin"
                        request="POST"
                        text={`/api/${params.storeId}/sizes/{sizeId}`}
                    />
                    <Clipboard
                        badge="admin"
                        request="PATCH"
                        text={`/api/${params.storeId}/sizes/{sizeId}`}
                    />
                    <Clipboard
                        badge="admin"
                        request="DELETE"
                        text={`/api/${params.storeId}/sizes/{sizeId}`}
                    />
                </div>
            </div>
        </DashboardShell>
    );
};

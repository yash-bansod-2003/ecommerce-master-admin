"use client";

import { DashboardHeader } from "@/components/header";
import { Icons } from "@/components/icons";
import { DashboardShell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { Clipboard } from "@/components/clipboard";
import { useRouter, useParams } from "next/navigation";

interface CategoryClientProps {
    categories: Array<any>;
}

export const CategoryClient: React.FC<CategoryClientProps> = ({
    categories,
}) => {
    const params = useParams();
    const router = useRouter();
    return (
        <DashboardShell>
            <DashboardHeader
                heading="Categories"
                text="Simplify category control: Customize and fine-tune settings effortlessly"
            >
                <Button
                    onClick={() =>
                        router.push(`/${params.storeId}/categories/new`)
                    }
                >
                    <Icons.add className="h-4 w-4 mr-2" />
                    Add New
                </Button>
            </DashboardHeader>
            <div className="grid gap-10">
                <DataTable
                    columns={columns}
                    data={categories}
                    filterKey="name"
                />
                <div className="grid gap-4">
                    <Clipboard text={`/api/${params.storeId}/categories`} />
                    <Clipboard
                        text={`/api/${params.storeId}/categories/{categoryId}`}
                    />
                    <Clipboard
                        badge="admin"
                        request="POST"
                        text={`/api/${params.storeId}/categories/{categoryId}`}
                    />
                    <Clipboard
                        badge="admin"
                        request="PATCH"
                        text={`/api/${params.storeId}/categories/{categoryId}`}
                    />
                    <Clipboard
                        badge="admin"
                        request="DELETE"
                        text={`/api/${params.storeId}/categories/{categoryId}`}
                    />
                </div>
            </div>
        </DashboardShell>
    );
};

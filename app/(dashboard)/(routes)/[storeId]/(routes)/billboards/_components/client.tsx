"use client";

import * as React from "react";
import { DashboardHeader } from "@/components/header";
import { Icons } from "@/components/icons";
import { DashboardShell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { Clipboard } from "@/components/clipboard";
import { useRouter, useParams } from "next/navigation";

interface BillboardClientProps {
    billboards: Array<any>;
}

export const BillboardClient: React.FC<BillboardClientProps> = ({
    billboards: billboards,
}) => {
    const params = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        () => {
            setIsLoading(false);
        };
    }, []);

    return (
        <DashboardShell>
            <DashboardHeader
                heading={`Billboards(${billboards.length})`}
                text="Revolutionize your brand visibility with easy billboard customization."
            >
                <Button
                    onClick={() => {
                        setIsLoading(true);
                        router.push(`/${params.storeId}/billboards/new`);
                    }}
                >
                    {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.add className="mr-2 h-4 w-4" />
                    )}
                    Add new
                </Button>
            </DashboardHeader>
            <div className="grid gap-10">
                <DataTable
                    columns={columns}
                    data={billboards}
                    filterKey="label"
                />
                <div className="grid gap-4">
                    <Clipboard text={`/api/${params.storeId}/billboards`} />
                    <Clipboard
                        text={`/api/${params.storeId}/billboards/{billboardId}`}
                    />
                    <Clipboard
                        badge="admin"
                        request="POST"
                        text={`/api/${params.storeId}/billboards/{billboardId}`}
                    />
                    <Clipboard
                        badge="admin"
                        request="PATCH"
                        text={`/api/${params.storeId}/billboards/{billboardId}`}
                    />
                    <Clipboard
                        badge="admin"
                        request="DELETE"
                        text={`/api/${params.storeId}/billboards/{billboardId}`}
                    />
                </div>
            </div>
        </DashboardShell>
    );
};

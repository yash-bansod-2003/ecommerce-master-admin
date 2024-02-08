"use client";

import { DashboardHeader } from "@/components/header";
import { Icons } from "@/components/icons";
import { DashboardShell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { columns, OrderColumn } from "./column";
import { Clipboard } from "@/components/clipboard";
import { useRouter, useParams } from "next/navigation";
import { cn } from "@/lib/utils";

type OrdersClientProps = React.HTMLAttributes<HTMLDivElement> & {
    orders: Array<OrderColumn>;
};

const OrdersClient: React.FC<OrdersClientProps> = ({
    orders,
    className,
    ...props
}) => {
    const params = useParams();
    const router = useRouter();

    return (
        <DashboardShell>
            <DashboardHeader
                heading="Orders"
                text="Manage and Get Details of your orders at one place."
            />
            <div className={cn("grid gap-10", className)} {...props}>
                <DataTable columns={columns} data={orders} filterKey="name" />
                <div className="grid gap-4">
                    <Clipboard text={`/api/${params.storeId}/orders`} />
                    <Clipboard
                        text={`/api/${params.storeId}/products/{orderId}`}
                    />
                    <Clipboard
                        badge="admin"
                        request="DELETE"
                        text={`/api/${params.storeId}/products/{orderId}`}
                    />
                </div>
            </div>
        </DashboardShell>
    );
};

export { OrdersClient };

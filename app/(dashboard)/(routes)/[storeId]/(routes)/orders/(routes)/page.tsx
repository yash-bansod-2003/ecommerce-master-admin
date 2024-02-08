import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { OrdersClient } from "../_components/client";
import { db } from "@/lib/db";
import { OrderColumn } from "../_components/column";

import { formatter } from "@/lib/utils";

export const metadata = {
    title: "Orders",
    description: "Details of orders.",
};

interface OrdersPageProps {
    params: {
        storeId: string;
    };
}

const OrdersPage: React.FC<OrdersPageProps> = async ({ params }) => {
    const user = await currentUser();

    if (!user) {
        return redirect("/sign-in");
    }

    const orders = await db.order.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const formattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        isPaid: item.isPaid,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
        products: item.orderItems
            .map((orderItem) => orderItem.product.name)
            .join(", "),
        totalPrice: formatter.format(
            item.orderItems.reduce((total, item) => {
                return total + Number(item.product.price);
            }, 0),
        ),
    }));

    return <OrdersClient orders={formattedOrders} />;
};

export default OrdersPage;

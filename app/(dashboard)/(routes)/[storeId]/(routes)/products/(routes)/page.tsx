import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { ProductsClient } from "../_components/client";
import { db } from "@/lib/db";
import { ProductColumn } from "../_components/column";

import { formatter } from "@/lib/utils";

export const metadata = {
    title: "Products",
    description: "Manage ans Customize products.",
};

interface ProductsPageProps {
    params: {
        storeId: string;
    };
}

const ProductsPage: React.FC<ProductsPageProps> = async ({ params }) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/sign-in");
    }

    const products = await db.product.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            category: true,
            size: true,
            color: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const formattedProducts: Array<ProductColumn> = products.map((item) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(item.price.toNumber()),
        category: item.category.name,
        color: item.color.value,
        size: item.size.name,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return <ProductsClient products={formattedProducts} />;
};

export default ProductsPage;

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { db } from "@/lib/db";
import { ProductForm } from "./_components/form";
import { ProductDeleteButton } from "../../_components/remove-button";
import { Icons } from "@/components/icons";

export const metadata = {
    title: "Product",
    description: "personalize your product preferences",
};

interface ProductPageProps {
    params: {
        storeId: string;
        productId: string;
    };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
    const user = await currentUser();

    if (!user) {
        return redirect("/sign-in");
    }

    const product = await db.product.findUnique({
        where: {
            id: params.productId,
        },
    });

    const categories = await db.category.findMany({
        where: {
            storeId: params.storeId,
        },
    });

    const sizes = await db.size.findMany({
        where: {
            storeId: params.storeId,
        },
    });

    const colors = await db.color.findMany({
        where: {
            storeId: params.storeId,
        },
    });

    return (
        <DashboardShell>
            <DashboardHeader
                heading="Product"
                text="Create and manage Product."
            >
                {params.productId !== "new" && (
                    <ProductDeleteButton
                        storeId={params.storeId}
                        productId={params.productId}
                        variant="destructive"
                        size="icon"
                    >
                        <Icons.trash />
                    </ProductDeleteButton>
                )}
            </DashboardHeader>
            <div className="grid gap-10">
                <ProductForm
                    product={product}
                    storeId={params.storeId}
                    categories={categories}
                    sizes={sizes}
                    colors={colors}
                />
            </div>
        </DashboardShell>
    );
};

export default ProductPage;

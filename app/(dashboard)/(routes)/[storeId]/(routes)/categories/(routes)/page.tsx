import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CategoryClient } from "../_components/client";
import { db } from "@/lib/db";

export const metadata = {
    title: "Categories",
    description: "Manage categories and categories settings.",
};

interface CategoriesPageProps {
    params: {
        storeId: string;
    };
}

const CategoriesPage: React.FC<CategoriesPageProps> = async ({ params }) => {
    const user = await currentUser();

    if (!user) {
        return redirect("/sign-in");
    }

    const Categories = await db.category.findMany({
        where: {
            storeId: params.storeId,
        },
    });

    return <CategoryClient categories={Categories} />;
};

export default CategoriesPage;

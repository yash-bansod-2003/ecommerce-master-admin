import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { SizeClient } from "../_components/client";
import { db } from "@/lib/db";

export const metadata = {
    title: "Sizes",
    description: " Customize and manage size.",
};

interface SizesPageProps {
    params: {
        storeId: string;
    };
}

const SizesPage: React.FC<SizesPageProps> = async ({ params }) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/sign-in");
    }

    const sizes = await db.size.findMany({
        where: {
            storeId: params.storeId,
        },
    });

    return <SizeClient sizes={sizes} />;
};

export default SizesPage;

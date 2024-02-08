import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ColorClient } from "../_components/client";
import { db } from "@/lib/db";

export const metadata = {
    title: "Colors",
    description: "Manage ans Customize colors.",
};

interface ColorsPageProps {
    params: {
        storeId: string;
    };
}

const ColorsPage: React.FC<ColorsPageProps> = async ({ params }) => {
    const user = currentUser();

    if (!user) {
        return redirect("/sign-in");
    }

    const colors = await db.color.findMany({
        where: {
            storeId: params.storeId,
        },
    });

    return <ColorClient colors={colors} />;
};

export default ColorsPage;

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { db } from "@/lib/db";
import { BillboardForm } from "../_components/form";

export const metadata = {
    title: "Billboard",
    description: "billboard customization.",
};

interface BillboardPageProps {
    params: {
        storeId: string;
        billboardId: string;
    };
}

const BillboardsPage: React.FC<BillboardPageProps> = async ({ params }) => {
    const user = await currentUser();

    if (!user) {
        return redirect("/sign-in");
    }

    const billboard = await db.billboard.findUnique({
        where: {
            id: params.billboardId,
        },
    });

    return (
        <DashboardShell>
            <DashboardHeader
                heading={billboard ? "Edit Billboard" : "Create Billboard"}
                text={
                    billboard
                        ? "Edit billboard details at one place."
                        : "Fill deatails and create new billboard."
                }
            />
            <div className="grid gap-10">
                <BillboardForm billboard={billboard} storeId={params.storeId} />
            </div>
        </DashboardShell>
    );
};

export default BillboardsPage;

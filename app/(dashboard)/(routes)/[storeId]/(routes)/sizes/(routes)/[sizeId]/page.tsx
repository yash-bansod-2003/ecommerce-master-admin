import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { db } from "@/lib/db";
import { SizeForm } from "./_components/form";
import { SizeDeleteButton } from "../../_components/remove-button";
import { Icons } from "@/components/icons";

export const metadata = {
    title: "Sizes",
    description: "personalize your size preferences",
};

interface SizePageProps {
    params: {
        storeId: string;
        sizeId: string;
    };
}

const SizePage: React.FC<SizePageProps> = async ({ params }) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/sign-in");
    }

    const size = await db.size.findUnique({
        where: {
            id: params.sizeId,
        },
    });

    return (
        <DashboardShell>
            <DashboardHeader
                heading="Sizes"
                text="Size it up! Easily manage and personalize your size preferences here."
            >
                {params.sizeId !== "new" && (
                    <SizeDeleteButton
                        storeId={params.storeId}
                        sizeId={params.sizeId}
                        variant="destructive"
                        size="icon"
                    >
                        <Icons.trash />
                    </SizeDeleteButton>
                )}
            </DashboardHeader>
            <div className="grid gap-10">
                <SizeForm size={size} storeId={params.storeId} />
            </div>
        </DashboardShell>
    );
};

export default SizePage;

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { StoreNameForm } from "@/components/dashboard/store/store-name-form";
import { db } from "@/lib/db";
import { Clipboard } from "@/components/clipboard";
import { StoreDeleteButton } from "@/components/dashboard/store/store-delete-button";
import { useOrigin } from "@/hooks/use-origin";

export const metadata = {
    title: "Settings",
    description: "Manage store and website settings.",
};

interface SettingsPageProps {
    params: {
        storeId: string;
    };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
    const user = await currentUser();

    if (!user) {
        return redirect("/sign-in");
    }

    const store = await db.store.findFirst({
        where: {
            id: params.storeId,
            userId: user.id,
        },
    });

    if (!store) {
        return redirect("/");
    }

    return (
        <DashboardShell>
            <DashboardHeader
                heading="Settings"
                text="Manage store and website settings."
            >
                <StoreDeleteButton store={store} />
            </DashboardHeader>

            <div className="grid gap-10">
                <StoreNameForm
                    store={{ id: store.id, name: store.name || "" }}
                />
                <div className="grid gap-4">
                    <Clipboard text={`/api/srores`} />
                    <Clipboard text={`/api/${params.storeId}`} />
                    <Clipboard
                        request="POST"
                        badge="admin"
                        text={`/api/${params.storeId}`}
                    />
                    <Clipboard
                        request="PATCH"
                        badge="admin"
                        text={`/api/${params.storeId}`}
                    />
                    <Clipboard
                        request="DELETE"
                        badge="admin"
                        text={`/api/${params.storeId}`}
                    />
                </div>
            </div>
        </DashboardShell>
    );
};

export default SettingsPage;

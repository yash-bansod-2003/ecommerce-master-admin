import { auth, currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface RootLayoutProps {
    children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
    const isAuthenticated = auth();
    const user = await currentUser();

    if (!isAuthenticated) {
        return redirect("/sign-in");
    }

    const dbStore = await db.store.findFirst({
        where: {
            userId: user?.id,
        },
    });

    if (dbStore) {
        return redirect(`/${dbStore.id}`);
    }

    return <div>{children}</div>;
}

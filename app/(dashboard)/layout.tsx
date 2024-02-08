import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type DashboardLayoutProps = React.PropsWithChildren;

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({
    children,
}) => {
    const isAuthenticated = auth();

    if (!isAuthenticated) {
        return redirect("/sign-in");
    }

    return <>{children}</>;
};

export default DashboardLayout;

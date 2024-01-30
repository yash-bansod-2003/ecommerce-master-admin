import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation"

type DashboardLayoutProps = React.PropsWithChildren

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
      const isAuth = auth();
      const user = currentUser();

      if (!isAuth || !user) {
            return redirect("/sign-in")
      }
      
      return (
            <>
                  {children}
            </>
      )
}

export default DashboardLayout;
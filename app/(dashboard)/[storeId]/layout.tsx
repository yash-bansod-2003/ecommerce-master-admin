import { dashboardConfig } from "@/config/dashboard"
import { MainNav } from "@/components/dashboard/main-nav";
import { StoreSwitcher } from "@/components/dashboard/store-switcher";
import { UserNav } from "@/components/dashboard/user-nav";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { storesMapper } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

interface DashboardLayoutProps {
      children: React.ReactNode,
      params: { storeId: string }
}

export default async function DashboardLayout({ children, params }: DashboardLayoutProps) {
      const { userId } = auth();

      if (!userId) {
            redirect("/sign-in")
      }

      const dbStore = await db.store.findFirst({
            where: {
                  id: params.storeId,
                  userId
            }
      });

      if (!dbStore) {
            redirect('/');
      }

      const dbStores = await db.store.findMany({
            where: {
                  userId
            }
      });

      const stores = storesMapper(dbStores);

      return (
            <div className="flex-col flex">
                  <div className="border-b">
                        <div className="flex h-16 items-center px-4">
                              <StoreSwitcher
                                    items={stores}
                                    currentItem={{ label: dbStore.name, value: dbStore.id }}
                              />
                              <MainNav items={dashboardConfig.mainNav} store={dbStore} />
                              <div className="ml-auto flex items-center space-x-6">
                                    <ModeToggle />
                                    <UserNav />
                              </div>
                        </div>
                  </div>
                  <div className="flex-1 space-y-4 p-8 pt-6">
                        {children}
                  </div>
            </div>
      )
}
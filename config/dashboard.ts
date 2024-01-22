import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
      mainNav: [
            {
                  title: "Documentation",
                  href: "/docs",
            },
            {
                  title: "Support",
                  href: "/support",
                  disabled: true,
            },
      ],
      sidebarNav: [
            {
                  title: "Products",
                  href: "/dashboard/products",
                  icon: "product",
            },
            {
                  title: "Sizes",
                  href: "/dashboard/sizes",
                  icon: "size",
            },
            {
                  title: "Colors",
                  href: "/dashboard/colors",
                  icon: "palette",
            },
            {
                  title: "Settings",
                  href: "/dashboard/settings",
                  icon: "settings",
            },
      ],
}
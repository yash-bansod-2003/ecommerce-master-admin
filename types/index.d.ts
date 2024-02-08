import type { Icon } from "lucide-react";

import { Icons } from "@/components/icons";

export type MainNavItem = {
    title: string;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icons;
} & (
    | {
          href: string;
          items?: never;
      }
    | {
          href?: string;
          items: NavLink[];
      }
);

export type DashboardConfig = {
    mainNav: MainNavItem[];
};

export type StoreSelectItem = {
    label: string;
    value: string;
};

export type FilterProps = {
    filterKey: "name" | "email" | "label";
};

import Link from "next/link";
import { MainNavItem } from "@/types";
import { Store } from "@prisma/client";

interface MainNavProps {
    items?: MainNavItem[];
    children?: React.ReactNode;
    store: Store;
}

export const MainNav: React.FC<MainNavProps> = ({ items, children, store }) => {
    return (
        <>
            {items?.length && (
                <nav className="flex items-center space-x-4 lg:space-x-6 ml-6">
                    <Link
                        key="overview"
                        href={`/${store.id}`}
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        Overview
                    </Link>

                    {items.map((item) => {
                        return (
                            item.title && (
                                <Link
                                    key={item.href}
                                    href={`/${store.id}/${item.title.toLowerCase()}`}
                                    className="text-sm font-medium transition-colors hover:text-primary"
                                >
                                    {item.title}
                                </Link>
                            )
                        );
                    })}
                </nav>
            )}
        </>
    );
};

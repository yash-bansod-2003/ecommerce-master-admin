"use client";

import { useSession } from "@clerk/nextjs";
import { useClerk } from "@clerk/clerk-react";
import { useRouter, redirect } from "next/navigation";
import { useMounted } from "@/hooks/use-mounted";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserNav() {
    const { isMounted } = useMounted();
    const router = useRouter();
    const { session } = useSession();
    const { signOut } = useClerk();

    if (!session) {
        return redirect("/sign-in");
    }

    if (!isMounted) {
        return null;
    }

    const nameInitials = `${session.user.firstName?.charAt(0)} ${session.user.lastName?.charAt(0)}`;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src={session.user?.imageUrl}
                            alt="@shadcn"
                        />
                        <AvatarFallback>{nameInitials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{`${session.user?.firstName} ${session.user?.lastName}`}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {session.user.emailAddresses[0].emailAddress}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>New Team</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => signOut(() => router.push("/"))}
                >
                    Log Out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

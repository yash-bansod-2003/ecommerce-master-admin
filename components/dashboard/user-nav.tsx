import { currentUser } from "@clerk/nextjs";

import {
      Avatar,
      AvatarFallback,
      AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuGroup,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuShortcut,
      DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { redirect } from "next/navigation";

export async function UserNav() {
      const user = await currentUser();

      if (!user) {
            redirect("/sign-in")
      }

      const nameInitials = `${user?.firstName?.charAt(0)} ${user?.lastName?.charAt(0)}`
      return (
            <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                              <Avatar className="h-8 w-8">
                                    <AvatarImage src={user?.imageUrl} alt="@shadcn" />
                                    <AvatarFallback>{nameInitials}</AvatarFallback>
                              </Avatar>
                        </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                              <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{`${user?.firstName} ${user?.lastName}`}</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                          {user.emailAddresses[0].emailAddress}
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
                        <DropdownMenuItem>
                              Log out
                              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                  </DropdownMenuContent>
            </DropdownMenu>
      )
}
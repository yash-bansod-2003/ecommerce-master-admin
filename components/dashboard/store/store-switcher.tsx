"use client";

import * as React from "react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { StoreSelectItem } from "@/types";
import { useStoreModal } from "@/hooks/use-store-modal";
import { redirect, useRouter } from "next/navigation";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
    typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Array<StoreSelectItem>;
    currentItem: StoreSelectItem;
}

export function StoreSwitcher({
    className,
    items,
    currentItem,
}: StoreSwitcherProps) {
    const router = useRouter();
    const { onOpen } = useStoreModal();
    const [open, setOpen] = React.useState(false);
    const [selectedStore, setSelectedStore] =
        React.useState<StoreSelectItem>(currentItem);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a team"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <Icons.store className="h-4 w-4 mr-2" />
                    {selectedStore.label}
                    <Icons.caretSort className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search team..." />
                        <CommandEmpty>No store found.</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    onSelect={() => {
                                        setSelectedStore(item);
                                        setOpen(false);
                                        router.push(`/${item.value}`);
                                    }}
                                    className="text-sm"
                                >
                                    <Avatar className="mr-2 h-5 w-5">
                                        <AvatarImage
                                            src={`https://avatar.vercel.sh/${item.value}.png`}
                                            alt={item.label}
                                            className="grayscale"
                                        />
                                        <AvatarFallback>SC</AvatarFallback>
                                    </Avatar>
                                    {item.label}
                                    <Icons.check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            selectedStore.value === item.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false);
                                    onOpen();
                                }}
                            >
                                <Icons.plusCircle className="mr-2 h-5 w-5" />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

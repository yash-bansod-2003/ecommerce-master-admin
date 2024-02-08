"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Store } from "@prisma/client";
import { toast } from "sonner";
import { Button, ButtonProps } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type StoreDeleteButtonProps = ButtonProps & {
    store: Store;
};

const StoreDeleteButton: React.FC<StoreDeleteButtonProps> = ({
    store,
    className,
    ...props
}) => {
    const router = useRouter();
    const { isMounted } = useMounted();
    const [isDeleteing, setIsDeleteing] = React.useState<boolean>(false);

    if (!isMounted) {
        return null;
    }

    async function onSubmit(store: Store) {
        setIsDeleteing(true);

        const response = await fetch(`/api/${store.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        setIsDeleteing(false);

        if (!response?.ok) {
            return toast.error("Something went wrong", {
                description: "Your store was not deleted. Please try again.",
            });
        }

        router.refresh();

        return toast.success("Your store is successfully removed.", {
            description: "please refer dashboard to check updation",
        });
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    className={cn("", className)}
                    variant="destructive"
                    size="icon"
                    disabled={isDeleteing}
                >
                    {isDeleteing ? (
                        <Icons.spinner className="animate-spin" />
                    ) : (
                        <Icons.trash />
                    )}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your store and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleteing}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => onSubmit(store)}
                        disabled={isDeleteing}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export { StoreDeleteButton };

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
} from "@/components/ui/alert-dialog"



type BillboardDeleteButtonProps = ButtonProps & {
      storeId: string
      billboardId: string
}

const BillboardDeleteButton: React.FC<BillboardDeleteButtonProps> = ({ storeId, billboardId, className, children, ...props }) => {
      const router = useRouter();
      const { isMounted } = useMounted();
      const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

      if (!isMounted) {
            return null;
      }

      async function onSubmit(storeId: string, billboardId: string) {
            setIsDeleting(true)

            const response = await fetch(`/api/${storeId}/billboards/${billboardId}`, {
                  method: "DELETE",
                  headers: {
                        "Content-Type": "application/json",
                  },
            })

            setIsDeleting(false)

            if (!response?.ok) {
                  return toast.error("Something went wrong", {
                        description: "Your billboard was not deleted. Please try again."
                  })
            }

            router.refresh()

            return toast.success("Your Billboard is successfully removed.", {
                  description: "please refer dashboard to check updates",
            })

      }
      return (
            <AlertDialog>
                  <AlertDialogTrigger asChild>
                        <button
                              className={cn("", className)}
                              disabled={isDeleting}
                        >
                              {children}
                        </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                        <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your billboard
                                    and remove your data from our servers.
                              </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                              <AlertDialogCancel
                                    disabled={isDeleting}
                              >
                                    Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                    onClick={() => onSubmit(storeId, billboardId)}
                                    disabled={isDeleting}
                              >
                                    Continue
                              </AlertDialogAction>
                        </AlertDialogFooter>
                  </AlertDialogContent>
            </AlertDialog>
      );
}

export { BillboardDeleteButton }
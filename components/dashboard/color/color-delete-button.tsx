"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ButtonProps, Button } from "@/components/ui/button";
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



type ColorDeleteButtonProps = ButtonProps & {
      storeId: string
      colorId: string
}

const ColorDeleteButton: React.FC<ColorDeleteButtonProps> = ({ storeId, colorId, className, children, ...props }) => {
      const router = useRouter();
      const { isMounted } = useMounted();
      const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

      if (!isMounted) {
            return null;
      }

      async function onSubmit(storeId: string, colorId: string) {
            setIsDeleting(true)

            const response = await fetch(`/api/${storeId}/colors/${colorId}`, {
                  method: "DELETE",
                  headers: {
                        "Content-Type": "application/json",
                  },
            })

            setIsDeleting(false)

            if (!response?.ok) {
                  return toast.error("Something went wrong", {
                        description: "Your size was not deleted. Please try again."
                  })
            }

            router.refresh()

            return toast.success("Your Size is successfully removed.", {
                  description: "please refer dashboard to check updates",
            })

      }
      return (
            <AlertDialog>
                  <AlertDialogTrigger asChild>
                        <Button
                              className={cn("", className)}
                              disabled={isDeleting}
                              {...props}
                        >
                              {children}
                        </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                        <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your size
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
                                    onClick={() => onSubmit(storeId, colorId)}
                                    disabled={isDeleting}
                              >
                                    Continue
                              </AlertDialogAction>
                        </AlertDialogFooter>
                  </AlertDialogContent>
            </AlertDialog>
      );
}

export { ColorDeleteButton }
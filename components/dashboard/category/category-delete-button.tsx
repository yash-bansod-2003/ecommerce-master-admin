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



type CategoryDeleteButtonProps = ButtonProps & {
      storeId: string
      categoryId: string
}

const CategoryDeleteButton: React.FC<CategoryDeleteButtonProps> = ({ storeId, categoryId, className, children, ...props }) => {
      const router = useRouter();
      const { isMounted } = useMounted();
      const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

      if (!isMounted) {
            return null;
      }

      async function onSubmit(storeId: string, categoryId: string) {
            setIsDeleting(true)

            const response = await fetch(`/api/${storeId}/categories/${categoryId}`, {
                  method: "DELETE",
                  headers: {
                        "Content-Type": "application/json",
                  },
            })

            setIsDeleting(false)

            if (!response?.ok) {
                  return toast.error("Something went wrong", {
                        description: "Your category was not deleted. Please try again."
                  })
            }

            router.refresh()

            return toast.success("Your Category is successfully removed.", {
                  description: "please refer dashboard to check updates",
            })

      }
      return (
            <AlertDialog>
                  <AlertDialogTrigger asChild>
                        <Button
                              className={cn("items-start", className)}
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
                                    onClick={() => onSubmit(storeId, categoryId)}
                                    disabled={isDeleting}
                              >
                                    Continue
                              </AlertDialogAction>
                        </AlertDialogFooter>
                  </AlertDialogContent>
            </AlertDialog>
      );
}

export { CategoryDeleteButton }
"use client"

import * as React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogFooter,
      DialogHeader,
      DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import {
      Form,
      FormControl,
      FormDescription,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "../icons";

interface StoreModalProps {
      open?: boolean
}

const formSchema = z.object({
      name: z.string().min(2).max(50),
})

export const StoreModal: React.FC<StoreModalProps> = ({ open = false }) => {

      const router = useRouter();
      const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                  name: "",
            },
      })

      const [isOpen, setIsOpen] = React.useState<boolean>(open);
      const [isLoading, setIsLoading] = React.useState<boolean>(false)


      async function onSubmit(values: z.infer<typeof formSchema>) {
            setIsLoading(true)

            const response = await fetch("/api/stores", {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
            })

            setIsLoading(false)

            if (!response?.ok) {
                  return toast.error("Something went wrong.", {
                        description: "Your post was not created. Please try again."
                  })
            }

            const store = await response.json()

            // This forces a cache invalidation.
            router.refresh()

            router.push(`/${store.id}`)
      }

      return (
            <Dialog open={isOpen} onOpenChange={() => setIsOpen(state => !state)}>
                  <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                              <DialogTitle>Create Store</DialogTitle>
                              <DialogDescription>
                                    Create a store in single click, at one place press save and done.
                              </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                          control={form.control}
                                          name="name"
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>Name</FormLabel>
                                                      <FormControl>
                                                            <Input placeholder="cloths..." {...field} />
                                                      </FormControl>
                                                      <FormDescription>
                                                            This is your public display name.
                                                      </FormDescription>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                                    <DialogFooter>
                                          <Button
                                                onClick={() => setIsOpen(false)}
                                                disabled={isLoading}
                                          >
                                                Close
                                          </Button>
                                          <Button
                                                disabled={isLoading}
                                                type="submit"
                                          >
                                                {isLoading ? (
                                                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                                ) : (
                                                      <Icons.add className="mr-2 h-4 w-4" />
                                                )}
                                                Create Store
                                          </Button>
                                    </DialogFooter>
                              </form>
                        </Form>
                  </DialogContent>
            </Dialog>
      )
}

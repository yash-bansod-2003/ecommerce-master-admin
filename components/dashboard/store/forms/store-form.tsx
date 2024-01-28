"use client"

import * as React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
      DialogFooter,
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
import { Icons } from "../../../icons";


const formSchema = z.object({
      name: z.string().min(2).max(50),
})

interface StoreFormProps {
      onClose: () => void
}

export const StoreForm: React.FC<StoreFormProps> = ({ onClose }) => {
      const router = useRouter();
      const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                  name: "",
            },
      });

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
                        description: "Your store was not created. Please try again."
                  })
            }

            const store = await response.json()

            // This forces a modal to close
            onClose();

            // This forces a cache invalidation.
            router.refresh()

            router.push(`/${store.id}`)

            return toast.success("Your store was created.", {
                  description: "please check your dashboard for further updations."
            })
      }

      return (
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
                                    onClick={onClose}
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
      )
}
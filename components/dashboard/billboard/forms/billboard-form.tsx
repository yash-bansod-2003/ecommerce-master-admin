"use client";

import * as React from "react";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Billboard } from "@prisma/client"

import { FileUpload } from "@/components/file-upload";

import { Button } from "@/components/ui/button"
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
import { billboardSchema } from "@/lib/validations/billboard"
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Icons } from "../../../icons";

interface BillboardFormProps extends React.HTMLAttributes<HTMLDivElement> {
      billboard: Billboard | null
      storeId: string
}


export const BillboardForm: React.FC<BillboardFormProps> = ({ storeId, billboard, className, ...props }) => {
      const router = useRouter()
      const [isLoading, setIsLoading] = React.useState<boolean>(false)

      // 1. Define your form.
      const form = useForm<z.infer<typeof billboardSchema>>({
            resolver: zodResolver(billboardSchema),
            defaultValues: {
                  label: billboard?.label || "",
                  image: billboard?.image || ""
            },
      })


      async function onSubmit(values: z.infer<typeof billboardSchema>) {
            setIsLoading(true)

            const response = await fetch(`/api/${storeId}/billboards`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
            })

            setIsLoading(false)

            if (!response?.ok) {
                  return toast.error("Something went wrong.", {
                        description: "Your billboard was not created. Please try again."
                  })
            }

            const store = await response.json()

            // This forces a cache invalidation.
            router.refresh()

            router.push(`/${store.id}`)

            return toast.success("Your Billboard was created.", {
                  description: "please check your dashboard for further updates."
            })
      }

      return (
            <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} action="">
                        <div className="space-y-6">
                              <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>Image</FormLabel>
                                                <FormControl>
                                                      <FileUpload
                                                            endpoint="imageUploader"
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                      />
                                                </FormControl>
                                                <FormDescription>
                                                      This is your billboard display image.
                                                </FormDescription>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />
                              <FormField
                                    control={form.control}
                                    name="label"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>Label</FormLabel>
                                                <FormControl>
                                                      <Input placeholder="Billboard Label" className="max-w-[400px]" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                      This is your billboard identification label.
                                                </FormDescription>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />
                              <Button
                                    disabled={isLoading}
                                    type="submit"
                                    className="w-fit"
                              >
                                    {isLoading ? (
                                          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                          <Icons.add className="mr-2 h-4 w-4" />
                                    )}
                                    Save Changes
                              </Button>
                        </div>
                  </form>
            </Form>
      )
}
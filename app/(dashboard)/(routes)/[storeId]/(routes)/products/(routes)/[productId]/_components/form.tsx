"use client";

import * as React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Product } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productSchema } from "@/lib/validations/product";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import { FileUpload } from "@/components/file-upload";

interface ProductFormProps extends React.HTMLAttributes<HTMLDivElement> {
    product: Product | null;
    storeId: string;
}

export const ProductForm: React.FC<ProductFormProps> = ({
    storeId,
    product,
    className,
    ...props
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: product?.name || "",
            image: product?.image || "",
            price: Number(product?.price) || undefined,
            isFeatured: product?.isFeatured || false,
            isArchived: product?.isArchived || false,
            categoryId: product?.categoryId || "",
            sizeId: product?.sizeId || "",
            colorId: product?.sizeId || "",
        },
    });

    async function onSubmit(values: z.infer<typeof productSchema>) {
        setIsLoading(true);

        const response = await fetch(`/api/${storeId}/billboards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        setIsLoading(false);

        if (!response?.ok) {
            return toast.error("Something went wrong.", {
                description:
                    "Your billboard was not created. Please try again.",
            });
        }

        const billboard = await response.json();

        // This forces a cache invalidation.
        router.refresh();

        router.push(`/${billboard.storeId}/billboards`);

        return toast.success("Your Billboard was created.", {
            description: "please check your dashboard for further updates.",
        });
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
                    <div className="grid grid-cols-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Product Name"
                                            className="max-w-[400px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your product identification
                                        name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Product Name"
                                            className="max-w-[400px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your product identification
                                        name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
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
    );
};

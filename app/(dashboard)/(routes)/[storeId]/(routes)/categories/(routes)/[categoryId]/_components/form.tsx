"use client";

import * as React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Billboard, Category } from "@prisma/client";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { categorySchema } from "@/lib/validations/category";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Icons } from "@/components/icons";

interface BillboardFormProps extends React.HTMLAttributes<HTMLDivElement> {
    category: Category | null;
    billboards: Array<Billboard>;
    storeId: string;
}

export const CategoryForm: React.FC<BillboardFormProps> = ({
    storeId,
    category,
    billboards,
    className,
    ...props
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: category?.name || "",
            billboardId: category?.billboardId || "",
        },
    });

    async function onSubmit(values: z.infer<typeof categorySchema>) {
        setIsLoading(true);

        const response = await fetch(`/api/${storeId}/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        setIsLoading(false);

        if (!response?.ok) {
            return toast.error("Something went wrong.", {
                description: "Your category was not created. Please try again.",
            });
        }

        const category = await response.json();

        // This forces a cache invalidation.
        router.refresh();

        router.push(`/${category.storeId}/categories`);

        return toast.success("Your category was created.", {
            description: "please check your dashboard for further updates.",
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} action="">
                <div className="space-y-6" {...props}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Category Name"
                                        className="max-w-[400px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your category identification name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="billboardId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Billboard</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl className="w-[400px]">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a billboard" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {billboards.map((billboard) => (
                                            <SelectItem
                                                key={billboard.id}
                                                value={billboard.id}
                                            >
                                                {billboard.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    This is your billboard.
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
    );
};

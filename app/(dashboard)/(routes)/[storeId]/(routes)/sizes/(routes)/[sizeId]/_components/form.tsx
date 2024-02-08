"use client";

import * as React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Size } from "@prisma/client";
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
import { sizeSchema } from "@/lib/validations/size";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Icons } from "@/components/icons";

interface SizeFormProps extends React.HTMLAttributes<HTMLDivElement> {
    size: Size | null;
    storeId: string;
}

export const SizeForm: React.FC<SizeFormProps> = ({
    storeId,
    size,
    className,
    ...props
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof sizeSchema>>({
        resolver: zodResolver(sizeSchema),
        defaultValues: {
            name: size?.name || "",
            value: size?.value || "",
        },
    });

    async function onSubmit(values: z.infer<typeof sizeSchema>) {
        setIsLoading(true);

        const response = await fetch(`/api/${storeId}/sizes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        setIsLoading(false);

        if (!response?.ok) {
            return toast.error("Something went wrong.", {
                description: "Your size was not created. Please try again.",
            });
        }

        const size = await response.json();

        // This forces a cache invalidation.
        router.refresh();

        router.push(`/${size.storeId}/sizes`);

        return toast.success("Your size was created.", {
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
                                        placeholder="Size Name"
                                        className="max-w-[400px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your size identification name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Category Value"
                                        className="max-w-[400px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your size value.
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

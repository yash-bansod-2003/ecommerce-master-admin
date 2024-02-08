"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { storeNameSchema } from "@/lib/validations/store";
import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Icons } from "@/components/icons";

interface StoreNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
    store: Pick<Store, "id" | "name">;
}

type FormData = z.infer<typeof storeNameSchema>;

function StoreNameForm({ store, className, ...props }: StoreNameFormProps) {
    const router = useRouter();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(storeNameSchema),
        defaultValues: {
            name: store?.name || "",
        },
    });
    const [isSaving, setIsSaving] = React.useState<boolean>(false);

    async function onSubmit(data: FormData) {
        setIsSaving(true);

        const response = await fetch(`/api/${store.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
            }),
        });

        setIsSaving(false);

        if (!response?.ok) {
            return toast.error("Something went wrong", {
                description: "Your name was not updated. Please try again.",
            });
        }

        router.refresh();

        return toast.success("Your name has been updated.", {
            description: "please refer dashboard to check updates",
        });
    }

    return (
        <form
            className={cn(className)}
            onSubmit={handleSubmit(onSubmit)}
            {...props}
        >
            <Card>
                <CardHeader>
                    <CardTitle>Store Name</CardTitle>
                    <CardDescription>
                        Please enter store name or a display name you are
                        comfortable with.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="name">
                            Name
                        </Label>
                        <Input
                            id="name"
                            className="w-[400px]"
                            size={32}
                            {...register("name")}
                        />
                        {errors?.name && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <button
                        type="submit"
                        className={cn(buttonVariants(), className)}
                        disabled={isSaving}
                    >
                        {isSaving && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <span>Save</span>
                    </button>
                </CardFooter>
            </Card>
        </form>
    );
}

export { StoreNameForm };

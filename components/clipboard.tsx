"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useOrigin } from "@/hooks/use-origin";
import { Icons } from "@/components/icons";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ClipboardProps extends React.HTMLAttributes<HTMLDivElement> {
    text: string;
    badge?: "admin" | "public";
    request?: "GET" | "POST" | "DELETE" | "PATCH";
    origin?: boolean;
}

export const Clipboard: React.FC<ClipboardProps> = ({
    className,
    text,
    badge = "public",
    request = "GET",
    origin = true,
    ...props
}) => {
    const { origin: appOrigin } = useOrigin();
    const [copiedText, copy] = useCopyToClipboard();
    const [copied, setCopied] = React.useState<boolean>(false);

    return (
        <Card className={cn("border rounded-md p-0", className)} {...props}>
            <CardHeader className="border-b flex flex-row items-center justify-between py-1">
                <div className="flex items-center gap-4">
                    <div className="flex items-center">
                        <Icons.server className="mr-2 w-5 h-5" />
                        <span className="font-bold text-base">{request}</span>
                    </div>
                    <Badge
                        variant={badge === "public" ? "default" : "destructive"}
                        className="h-fit py-1"
                    >
                        {badge === "public" ? "Public" : "Admin"}
                    </Badge>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onMouseLeave={() => setCopied(false)}
                    onClick={() => {
                        copy(origin ? `${appOrigin}${text}` : text);
                        setCopied(true);
                    }}
                >
                    {copied ? (
                        <Icons.copyCheck className="h-4 w-4" />
                    ) : (
                        <Icons.copy className="h-4 w-4" />
                    )}
                </Button>
            </CardHeader>
            <CardContent className="flex py-4">
                <Input
                    type="email"
                    placeholder="Email"
                    disabled
                    value={origin ? `${appOrigin}${text}` : text}
                />
            </CardContent>
        </Card>
    );
};

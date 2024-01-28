"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/use-copy";
import { Icons } from "./icons";
import { Badge } from "@/components/ui/badge"


interface ClipboardProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
      text: string;
      badge?: "admin" | "public"
      request?: "GET" | "POST" | "DELETE" | "PATCH"
}

export const Clipboard: React.FC<ClipboardProps> = ({ className, text, badge = "public", request = "GET", ...props }) => {
      const [copiedText, copy] = useCopyToClipboard();
      const [copied, setCopied] = React.useState<boolean>(false);

      return (
            <Card className={cn("border rounded-md p-0", className)}>
                  <CardHeader className="border-b flex flex-row items-center justify-between py-1">
                        <div className="flex items-center gap-4">
                              <div className="flex items-center">
                                    <Icons.server className="mr-2 w-5 h-5" />
                                    <span className="font-bold text-base">{request}</span>
                              </div>
                              <Badge variant={badge === "public" ? "default" : "destructive"} className="h-fit py-1">
                                    {badge === "public" ? "Public" : "Admin"}
                              </Badge>
                        </div>
                        <Button
                              variant="ghost"
                              size="icon"
                              onMouseLeave={() => setCopied(false)}
                              onClick={() => {
                                    copy(text);
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
                              value={text}
                        />
                  </CardContent>
            </Card>
      )
}
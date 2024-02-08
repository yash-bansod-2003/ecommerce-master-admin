"use client";

import * as React from "react";
import { toast } from "sonner";

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
    const [copiedText, setCopiedText] = React.useState<CopiedValue>(null);

    const copy: CopyFn = React.useCallback(async (text) => {
        if (!navigator?.clipboard) {
            console.warn("Clipboard not supported");
            return false;
        }

        // Try to save to clipboard then save it in the state if worked
        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);
            toast.success("Copy to clipboard", {
                description: text,
            });
            return true;
        } catch (error) {
            toast.error("Copy failed", {
                description: String(error),
            });
            setCopiedText(null);
            return false;
        }
    }, []);

    return [copiedText, copy];
}

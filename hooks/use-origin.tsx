"use client";

import { useEffect, useState } from "react";

export const useOrigin = (): { origin: string } => {
    const [mounted, setMounted] = useState(false);
    let origin =
        typeof window !== "undefined" && window.location.origin
            ? window.location.origin
            : "";

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return { origin: "" };
    }

    return { origin };
};

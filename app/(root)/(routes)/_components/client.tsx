"use client";
import * as React from "react";
import { useMounted } from "@/hooks/use-mounted";
import { useStoreModal } from "@/hooks/use-store-modal";

type RootClientProps = React.HTMLAttributes<HTMLDivElement>;

const RootClient: React.FC<RootClientProps> = ({}) => {
    const { isMounted } = useMounted();
    const { isOpen, onOpen } = useStoreModal();

    React.useEffect(() => {
        if (!isOpen) {
            onOpen();
        }
    }, [isOpen, onOpen]);

    if (!isMounted) {
        return null;
    }

    return null;
};

export { RootClient };

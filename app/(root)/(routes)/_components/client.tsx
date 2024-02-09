"use client";
import * as React from "react";
import { useMounted } from "@/hooks/use-mounted";
import { useStoreModal } from "@/hooks/use-store-modal";

type RootClientProps = React.HTMLAttributes<HTMLDivElement>;

const RootClient: React.FC<RootClientProps> = ({}) => {
    const { isMounted } = useMounted();
    const { isOpen, onOpen, onClose } = useStoreModal();

    React.useEffect(() => {
        if (!isOpen) {
            onOpen();
        }
        () => {
            onClose();
        };
    }, [isOpen, onOpen]);

    if (!isMounted) {
        return null;
    }

    return null;
};

export { RootClient };

"use client";

import * as React from "react";
import { StoreModal } from "@/components/dashboard/store/store-modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useMounted } from "@/hooks/use-mounted";

export const StoreModalProvider = () => {
      const { isMounted } = useMounted();
      const { isOpen, onOpen, onClose } = useStoreModal();

      if (!isMounted) {
            return null;
      }

      return <StoreModal open={isOpen} onClose={onClose} onOpen={onOpen} />
}
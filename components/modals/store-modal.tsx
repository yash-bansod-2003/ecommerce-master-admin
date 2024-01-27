"use client"

import * as React from "react";
import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogHeader,
      DialogTitle,
} from "@/components/ui/dialog"
import { StoreForm } from "@/components/forms/store-form";
import { useMounted } from "@/hooks/use-mounted";

interface StoreModalProps {
      open?: boolean
      onClose: () => void
      onOpen: () => void
}

export const StoreModal: React.FC<StoreModalProps> = ({ open, onClose }) => {

      const { isMounted } = useMounted();

      const onChange = (open: boolean) => {
            if (!open) {
                  onClose();
            }
      }
      if (!isMounted) {
            return null;
      }

      return (
            <Dialog open={open} onOpenChange={onChange}>
                  <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                              <DialogTitle>Create Store</DialogTitle>
                              <DialogDescription>
                                    Create a store in single click, at one place press save and done.
                              </DialogDescription>
                        </DialogHeader>
                        <StoreForm onClose={onClose} />
                  </DialogContent>
            </Dialog>
      )
}

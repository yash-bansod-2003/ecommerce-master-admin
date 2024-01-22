"use client";
import * as React from "react";
import { useMounted } from "@/hooks/use-mounted";
import { StoreModal } from "@/components/modals/store-modal";
import { useStoreModal } from "@/hooks/use-store-modal";

export default function Home() {
  const { isMounted } = useMounted();

  if (!isMounted) {
    return null;
  }

  return <StoreModal open={true} />;
}

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Store } from "@prisma/client"
import { StoreSelectItem } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function storesMapper(stores: Store[]): Array<StoreSelectItem> {
  const mapper = (initial: StoreSelectItem[], item: Store): StoreSelectItem[] => {
    initial.push({ label: item.name, value: item.id });
    return initial;
  };
  return stores.reduce(mapper, []);
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: 'currency',
  currency: 'INR',
});
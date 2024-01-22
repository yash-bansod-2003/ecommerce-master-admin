import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UseStoreModalProps {
      isOpen: boolean;
      onClose: () => void;
      onOpen: () => void;
}

const useStoreModal = create<UseStoreModalProps>()(devtools((set) => ({
      isOpen: false,
      onOpen: () => set(() => ({ isOpen: true })),
      onClose: () => set(() => ({ isOpen: false })),
})));


export { useStoreModal };
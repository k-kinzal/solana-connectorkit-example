import { useState } from 'react';

export function useWalletModal() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return {
        isOpen,
        setIsOpen,
        openModal,
        closeModal,
    };
}

import { create } from 'zustand';

type ModalStore = {
	isModalOpen: boolean;
	selectedCardId: number | null;
	openModal: (cardId: number) => void;
	closeModal: () => void;
};

export const useModalStore = create<ModalStore>(set => ({
	isModalOpen: false,
	selectedCardId: null,
	openModal: cardId => set({ isModalOpen: true, selectedCardId: cardId }),
	closeModal: () => set({ isModalOpen: false, selectedCardId: null }),
}));

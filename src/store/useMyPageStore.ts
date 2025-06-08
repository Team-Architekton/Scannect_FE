import { create } from 'zustand';
import { Card } from '../model/card';

type MypageStore = {
	cards: Card[];
	selectedCardId: number | null;
	selectedCard: Card | null;
	isEditing: boolean;
	isLoading: boolean;

	setCards: (cards: Card[]) => void;
	setSelectedCardId: (id: number | null) => void;
	setIsEditing: (editing: boolean) => void;
	setIsLoading: (loading: boolean) => void;
};

export const useMypageStore = create<MypageStore>((set, get) => ({
	cards: [],
	selectedCardId: null,
	selectedCard: null,
	isEditing: false,
	isLoading: true,

	setCards: cards => {
		set({ cards });
		const selectedId = get().selectedCardId;
		if (selectedId) {
			const card = cards.find(c => c.id === selectedId) ?? null;
			set({ selectedCard: card });
		}
	},
	setSelectedCardId: id => {
		const card = get().cards.find(c => c.id === id) ?? null;
		set({ selectedCardId: id, selectedCard: card });
	},
	setIsEditing: editing => set({ isEditing: editing }),
	setIsLoading: loading => set({ isLoading: loading }),
}));

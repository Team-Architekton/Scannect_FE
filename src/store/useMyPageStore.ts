import { create } from 'zustand';
import { Card } from '../model/card';

type MypageStore = {
	cards: Card[];
	selectedCard: Card | null;
	setCards: (cards: Card[]) => void;
	setSelectedCard: (card: Card | null) => void;
	isEditing: boolean;
	setIsEditing: (editing: boolean) => void;
};

export const useMypageStore = create<MypageStore>((set, get) => ({
	cards: [],
	selectedCard: null,
	isEditing: false,

	setCards: cards => {
		set({ cards });
		if (cards.length > 0) {
			const stored = cards.find(c => c.isMain) ?? cards[0];
			set({ selectedCard: stored });
		}
	},

	setSelectedCard: card => {
		set({ selectedCard: card });
	},

	setIsEditing: editing => {
		set({ isEditing: editing });
	},
}));

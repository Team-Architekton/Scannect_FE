import { create } from 'zustand';
import { Card } from '../model/card';

type MypageStore = {
	cards: Card[];
	selectedCard: Card | null;
	setCards: (cards: Card[]) => void;
	setSelectedCard: (card: Card) => void;
};

export const useMypageStore = create<MypageStore>((set, get) => ({
	cards: [],
	selectedCard: null,

	setCards: cards => {
		set({ cards });
		if (cards.length > 0) {
			const stored = cards.find(c => c.isDefault) ?? cards[0];
			set({ selectedCard: stored });
		}
	},

	setSelectedCard: card => {
		set({ selectedCard: card });
	},
}));
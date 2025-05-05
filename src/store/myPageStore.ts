import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from '../model/card';

type MypageStore = {
	cards: Card[];
	selectedCard: Card | null;
	setCards: (cards: Card[]) => void;
	setSelectedCard: (card: Card) => void;
	setDefaultCard: (cardId: number) => void;
	deleteCard: (cardId: number) => void;
};

export const useMypageStore = create<MypageStore>((set, get) => ({
	cards: [],
	selectedCard: null,

	setCards: cards => {
		set({ cards });
		if (cards.length > 0) {
			const stored = cards.find(c => c.isDefault) ?? cards[0];
			set({ selectedCard: stored });
			AsyncStorage.setItem('selectedCard', JSON.stringify(stored));
		}
	},

	setSelectedCard: card => {
		set({ selectedCard: card });
		AsyncStorage.setItem('selectedCard', JSON.stringify(card));
	},

	setDefaultCard: cardId => {
		const updated = get().cards.map(card => ({
			...card,
			isDefault: card.id === cardId,
		}));

		set({ cards: updated });

		const newDefault = updated.find(c => c.id === cardId)!;
		set({ selectedCard: newDefault });
		AsyncStorage.setItem('selectedCard', JSON.stringify(newDefault));

		// 추후 API 호출로 기본명함 변경 처리 필요
		console.log('기본 명함으로 지정');
	},

	deleteCard: cardId => {
		const remaining = get().cards.filter(card => card.id !== cardId);
		set({ cards: remaining });

		if (get().selectedCard?.id === cardId) {
			const next = remaining[0] ?? null;
			set({ selectedCard: next });
			AsyncStorage.setItem('selectedCard', JSON.stringify(next));
		}

		// 추후 API 호출로 삭제 처리 필요
		console.log('명함 삭제');
	},
}));

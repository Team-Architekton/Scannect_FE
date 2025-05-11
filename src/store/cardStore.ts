import { create } from 'zustand';

import { ICardItem } from '../model/cardItem';

type CardStore = {
	cardList: ICardItem[];
	renderingList: {
		importantCards: ICardItem[];
		commonCards: ICardItem[];
		hiddenCards: ICardItem[];
	};
	sortOption: 'latest' | 'name';
	setCardList: (cards: ICardItem[]) => void;
	filterCardList: () => void;
	sortCardList: (option: 'latest' | 'name') => void;
	hideCard: (cardId: number, newStatus: boolean) => void;
	deleteCard: (cardId: number) => void;
	updateFavorite: (cardId: number, newStatus: boolean) => void;
	updateMemo: (cardId: number, newMemo: string) => void;
};

export const useCardStore = create<CardStore>((set, get) => ({
	// GET 해온 전체 명함 목록 (임시 더미데이터)
	cardList: [],
	// 실제 렌더링 할 명함 목록 (중요 인맥, 일반 명함, 숨긴 명함)
	renderingList: {
		importantCards: [],
		commonCards: [],
		hiddenCards: [],
	},
	sortOption: 'latest', // 정렬 기준

	filterCardList: () => {
		const cards = get().cardList;
		const importantCards = cards.filter(card => card.favorite && card.isActive);
		const commonCards = cards.filter(card => !card.favorite && card.isActive);
		const hiddenCards = cards.filter(card => !card.isActive);
		set({ renderingList: { importantCards, commonCards, hiddenCards } });
	},
	setCardList: cards => {
		set({ cardList: cards });
		get().filterCardList();
	},
	sortCardList: option => {
		set({ sortOption: option });
		const tempList = [...get().cardList];
		if (option === 'latest') tempList.sort((a, b) => b.created_at - a.created_at);
		else tempList.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));
		get().setCardList(tempList);
	},
	hideCard: (cardId, newStatus) => {
		// 명함 숨김 상태 업데이트 로직
		const newList = [...get().cardList].map(card =>
			card.id === cardId ? { ...card, isActive: newStatus } : card
		);
		get().setCardList(newList);
	},
	deleteCard: cardId => {
		// 명함 삭제 로직
		const newList = [...get().cardList].filter(card => card.id !== cardId);
		get().setCardList(newList);
	},
	updateFavorite: (cardId, newStatus) => {
		// 명함 중요 상태 업데이트 로직
		const newList = [...get().cardList].map(card =>
			card.id === cardId ? { ...card, favorite: newStatus } : card
		);
		get().setCardList(newList);
	},
	updateMemo: (cardId, newMemo) => {},
}));

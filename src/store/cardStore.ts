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
	isLoading: boolean;
	setCardList: (cards: ICardItem[]) => void;
	filterCardList: () => void;
	sortCardList: (option: 'latest' | 'name') => void;
	setIsLoading: (loading: boolean) => void;
};

export const useCardStore = create<CardStore>((set, get) => ({
	cardList: [],
	renderingList: {
		importantCards: [],
		commonCards: [],
		hiddenCards: [],
	},
	sortOption: 'latest', // 정렬 기준
	isLoading: false,
	setCardList: cards => {
		set({ cardList: cards });
		get().filterCardList();
	},
	filterCardList: () => {
		const cards = get().cardList;
		const importantCards = cards.filter(card => card.favorite && card.isActive);
		const commonCards = cards.filter(card => !card.favorite && card.isActive);
		const hiddenCards = cards.filter(card => !card.isActive);
		set({ renderingList: { importantCards, commonCards, hiddenCards } });
	},
	sortCardList: option => {
		set({ sortOption: option });
		const tempList = [...get().cardList];
		if (option === 'latest') tempList.sort((a, b) => b.id - a.id);
		else tempList.sort((a, b) => (a.nickname.toLowerCase() < b.nickname.toLowerCase() ? -1 : 1));
		get().setCardList(tempList);
	},
	setIsLoading: loading => set({ isLoading: loading }),
}));

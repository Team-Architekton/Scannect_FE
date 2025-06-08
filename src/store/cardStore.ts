import { create } from 'zustand';
import { ICardItem } from '../model/cardItem';

type CardStore = {
	cardList: ICardItem[];
	renderingList: {
		importantCards: ICardItem[];
		commonCards: ICardItem[];
		hiddenCards: ICardItem[];
	};
	searchList: ICardItem[];
	isSearching: boolean;
	sortOption: 'latest' | 'name';
	isLoading: boolean;
	setCardList: (cards: ICardItem[]) => void;
	setSearchList: (cards: ICardItem[]) => void;
	filterCardList: () => void;
	sortCardList: (option: 'latest' | 'name') => void;
	setIsLoading: (loading: boolean) => void;
	setIsSearching: (searching: boolean) => void;
};

export const useCardStore = create<CardStore>((set, get) => ({
	cardList: [],
	renderingList: {
		importantCards: [],
		commonCards: [],
		hiddenCards: [],
	},
	searchList: [],
	sortOption: 'latest', // 정렬 기준
	isLoading: false,
	isSearching: false,
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
	setSearchList: cards => {
		set({ searchList: cards });
	},
	setIsLoading: loading => set({ isLoading: loading }),
	setIsSearching: searching => set({ isSearching: searching }),
}));

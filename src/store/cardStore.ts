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
};

export const useCardStore = create<CardStore>((set, get) => ({
	cardList: [],
	renderingList: {
		importantCards: [],
		commonCards: [],
		hiddenCards: [],
	},
	sortOption: 'latest',

	filterCardList: () => {
		const cards = get().cardList;
		const importantCards = cards.filter(card => card.favorite && card.status);
		const commonCards = cards.filter(card => !card.favorite && card.status);
		const hiddenCards = cards.filter(card => !card.status);
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
}));

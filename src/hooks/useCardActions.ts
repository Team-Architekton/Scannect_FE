import { getCards } from '../server/cardList';
import { useCardStore } from '../store/cardStore';

export const useCardActions = () => {
	const setCardList = useCardStore(state => state.setCardList);
	const fetchCards = async () => {
		try {
			const cards = await getCards();
			setCardList(cards ? cards : []);
		} catch (e) {
			throw e;
		}
	};
	return { fetchCards };
};

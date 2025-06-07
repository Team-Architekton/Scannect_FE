import {
	getCards,
	updateIsActive,
	updateFavorite,
	deleteCard,
	updateMemo,
	searchCards,
} from '../server/cardList';
import { useCardStore } from '../store/cardStore';
import { getUserId } from '../utils/authStorage';

/** 타유저 명함 관련 비즈니스 로직 hook */
export const useCardList = () => {
	const { cardList, setCardList, setSearchList, setIsLoading, setIsSearching } = useCardStore();
	const handleFetchCards = async (loading: boolean) => {
		try {
			const userId = await getUserId(); // id: tester, password: 123456
			if (!userId) throw new Error('로그인 정보 없음');

			if (loading) setIsLoading(true);
			const cards = await getCards(userId);
			setCardList(cards ? cards : []);
			return true;
		} catch (e) {
			console.error('명함 리스트 조회 실패', e);
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	/** 타유저 명함 중요 표시(favorite) | 활성화 여부(isActive) | 메모 업데이트 함수 */
	const handleEditCard = async (id: number, editField: string, newData: boolean | string) => {
		try {
			const newList = [...cardList].map(card =>
				card.id === id ? { ...card, [editField]: newData } : card
			);
			if (editField === 'isActive' && typeof newData === 'boolean')
				await updateIsActive(id, newData);
			else if (editField === 'favorite' && typeof newData === 'boolean')
				await updateFavorite(id, newData);
			else if (editField === 'memo' && typeof newData === 'string') await updateMemo(id, newData);
			else throw new Error('데이터 타입 오류');

			setCardList(newList);
			return true;
		} catch (e) {
			console.error(`명함 ${editField} 수정 실패`, e);
			return false;
		}
	};

	const handleDeleteCard = async (id: number) => {
		const newList = [...cardList].filter(card => card.id !== id);
		try {
			await deleteCard(id);
			setCardList(newList);
			return true;
		} catch (e) {
			console.error(`명함 삭제 실패`, e);
			return false;
		}
	};

	const handleSearchCards = async (keyword: string) => {
		try {
			const userId = await getUserId(); // id: tester, password: 123456
			if (!userId) throw new Error('로그인 정보 없음');

			setIsLoading(true);
			const cards = await searchCards(userId, keyword);
			setSearchList(cards);
			setIsSearching(true);
			return cards;
		} catch (e) {
			console.error('명함 검색 실패', e);
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	return { handleFetchCards, handleEditCard, handleDeleteCard, handleSearchCards };
};

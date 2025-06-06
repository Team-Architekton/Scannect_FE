import {
	getCards,
	updateIsActive,
	updateFavorite,
	deleteCard,
	updateMemo,
} from '../server/cardList';
import { useCardStore } from '../store/cardStore';

/** 타유저 명함과 관련된 네트워크 + 비즈니스 로직 hook */
export const useCardList = () => {
	const { cardList, setCardList, setIsLoading } = useCardStore();
	const handleFetchCards = async (loading: boolean) => {
		try {
			if (loading) setIsLoading(true);
			const cards = await getCards();
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

	return { handleFetchCards, handleEditCard, handleDeleteCard };
};

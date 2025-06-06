import { getCards, updateIsActive, updateFavorite, deleteCard } from '../server/cardList';
import { useCardStore } from '../store/cardStore';

/** 타유저 명함과 관련된 네트워크 로직 hook */
export const useCardList = () => {
	const { cardList, setCardList, setError } = useCardStore();
	const handleFetchCards = async () => {
		try {
			const cards = await getCards();
			setCardList(cards ? cards : []);
		} catch (e) {
			console.error('명함 리스트 조회 실패', e);
			setError('명함 리스트 조회에 실패했습니다.');
		}
	};

	/** 타유저 명함 중요 표시(favorite) | 활성화 여부(isActive) 속성 업데이트 함수 */
	const handleEditCard = async (id: number, editField: string, newStatus: boolean) => {
		try {
			const newList = [...cardList].map(card =>
				card.id === id ? { ...card, [editField]: newStatus } : card
			);
			if (editField === 'isActive') await updateIsActive(id, newStatus);
			else if (editField === 'favorite') await updateFavorite(id, newStatus);
			setCardList(newList);
		} catch (e) {
			console.error(`명함 ${editField} 수정 실패`, e);
			setError('명함 정보 수정에 실패했습니다.');
		}
	};

	const handleDeleteCard = async (id: number) => {
		const newList = [...cardList].filter(card => card.id !== id);
		try {
			await deleteCard(id);
			setCardList(newList);
		} catch (e) {
			console.error(`명함 삭제 실패`, e);
			setError('명함 삭제에 실패했습니다.');
		}
	};

	return { handleFetchCards, handleEditCard, handleDeleteCard };
};

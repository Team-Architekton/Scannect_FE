import { useCallback } from 'react';
import { useMypageStore } from '../store/useMyPageStore';
import { CardForm } from './useCardForm';
import { getCards, patchMainCard, postCard, putCard } from '../server/myPage';
import { deleteCard as deleteCardAPI } from '../server/myPage';
import { useNavigation } from '@react-navigation/native';

export function useMypage() {
	const setCards = useMypageStore(state => state.setCards);
	const setIsLoading = useMypageStore(state => state.setIsLoading);
	const setSelectedCardId = useMypageStore(state => state.setSelectedCardId);
	const navigation = useNavigation<any>();

	const fetchCards = useCallback(
		async (keepSelectedId?: number | null, showLoading = true) => {
			try {
				if (showLoading) setIsLoading(true);
				const data = await getCards();
				if (data && Array.isArray(data)) {
					setCards(data);
					const mainCard = data.find(card => card.isMain);
					const nextSelected = data.find(card => card.id === keepSelectedId);
					setSelectedCardId(nextSelected?.id ?? mainCard?.id ?? data[0]?.id ?? null);
				}
			} catch (e) {
				console.error('명함 불러오기 실패:', e);
			} finally {
				if (showLoading) setIsLoading(false);
			}
		},
		[setCards, setSelectedCardId, setIsLoading]
	);

	const createCard = async (newCard: CardForm) => {
		try {
			const res = await postCard(newCard);
			if (res.success) {
				navigation.navigate('마이페이지');
			} else {
				console.log(res.message);
			}
		} catch (e) {
			console.error(e);
		}
	};

	const updateCard = async (id: number, form: Partial<CardForm>) => {
		try {
			const res = await putCard(id, form);
			if (res?.success) {
				await fetchCards(id, false);
			}
		} catch (error) {
			console.error('명함 수정 중 예외 발생:', error);
		}
	};

	const setDefaultCard = async (cardId: number) => {
		try {
			const res = await patchMainCard(cardId);
			if (res.success) {
				await fetchCards(null, true);
			} else {
				console.warn('기본 명함 설정 실패:', res.message);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const deleteCard = async (cardId: number) => {
		try {
			const res = await deleteCardAPI(cardId);
			if (res.success) {
				await fetchCards(null, false);
			} else {
				console.warn('명함 삭제 실패:', res.message);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return {
		fetchCards,
		createCard,
		updateCard,
		setDefaultCard,
		deleteCard,
	};
}

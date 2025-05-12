import { Alert } from 'react-native';

import { useModalStore } from '../store/modalStore';
import { useCardStore } from '../store/cardStore';

export function useCardModal() {
	const { hideCard, deleteCard } = useCardStore();
	const { closeModal } = useModalStore();

	const onHideCard = (cardId: number | null, newStatus: boolean) => {
		if (cardId === null) return;
		try {
			if (!newStatus) {
				// 명함을 숨기는 경우
				Alert.alert('선택한 명함을 숨김 처리합니다.', '정말 숨기시겠습니까?', [
					{
						text: '확인',
						onPress: () => {
							hideCard(cardId, newStatus);
							Alert.alert('명함이 숨김 처리되었습니다.');
						},
					},
					{ text: '취소' },
				]);
			} else {
				// 명함을 숨김 해제하는 경우
				hideCard(cardId, newStatus);
				Alert.alert('명함 숨김이 해제되었습니다.');
			}
		} catch {
			Alert.alert('처리에 실패했습니다. 잠시 후 다시 시도해주세요.');
		}
		closeModal();
	};

	const onDeleteCard = (cardId: number | null) => {
		if (cardId === null) return;
		try {
			Alert.alert('선택한 명함을 삭제합니다.', '정말 삭제하시겠습니까?', [
				{
					text: '확인',
					onPress: () => {
						deleteCard(cardId);
						Alert.alert('명함이 삭제되었습니다.');
					},
				},
				{ text: '취소' },
			]);
		} catch {
			Alert.alert('처리에 실패했습니다. 잠시 후 다시 시도해주세요.');
		}
		closeModal();
	};

	return { onHideCard, onDeleteCard };
}

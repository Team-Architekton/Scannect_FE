import { Alert } from 'react-native';
import { useModalStore } from '../store/modalStore';
import { useCardList } from './useCardList';

export function useCardModal() {
	const { closeModal } = useModalStore();
	const { handleEditCard, handleDeleteCard } = useCardList();

	const onHideCard = async (id: number, newStatus: boolean) => {
		const success = await handleEditCard(id, 'isActive', newStatus);
		if (success)
			Alert.alert(newStatus ? '명함 숨김이 해제되었습니다.' : '명함이 숨김 처리되었습니다.');
		else Alert.alert('처리 실패', '잠시 후 다시 시도해주세요.');

		closeModal();
	};

	const onDeleteCard = (id: number) => {
		Alert.alert('선택한 명함을 삭제합니다.', '정말 삭제하시겠습니까?', [
			{
				text: '확인',
				onPress: async () => {
					const success = await handleDeleteCard(id);
					if (success) Alert.alert('명함이 삭제되었습니다.');
					else Alert.alert('처리 실패', '잠시 후 다시 시도해주세요.');
				},
			},
			{ text: '취소' },
		]);
		closeModal();
	};

	return { onHideCard, onDeleteCard };
}

import { useGPSStore } from '../store/gpsStore';
import { useAuthStore } from '../store/authStore';
import { WebSocketManager } from '../server/webSocketManager';
import { useMypageStore } from '../store/useMyPageStore';
import { Alert } from 'react-native';
import { useCardList } from './useCardList';

export const useExchangeRequest = () => {
	const { id: currentUserId } = useAuthStore();
	const { selectedCard } = useMypageStore() as { selectedCard: { id: number } | null };
	const { selectedUserIds } = useGPSStore();

	const sendRequests = () => {
		if (selectedUserIds.length === 0) {
			Alert.alert('알림', '선택된 유저가 없습니다.');
			return;
		}

		selectedUserIds.forEach(toUserId => {
			if (selectedCard && typeof selectedCard.id === 'number') {
				const request = {
					type: 'request' as const,
					fromUserId: currentUserId,
					toUserId,
					cardId: selectedCard.id,
					message: '명함 교환 요청드립니다!',
				};
				WebSocketManager.sendMessage(request);
				console.log('📤 명함 요청 전송:', request);
			} else {
				console.warn('선택된 명함이 없거나 올바르지 않습니다.');
			}
		});
	};

	return { sendRequests };
};

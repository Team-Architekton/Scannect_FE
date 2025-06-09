import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useGPSStore } from '../store/gpsStore';
import { useAuthStore } from '../store/authStore';
import { useMypageStore } from '../store/useMyPageStore';
import { WebSocketManager } from '../server/webSocketManager';

export const useExchangeAlert = () => {
	const { gpsUserList, exchangeUserId, exchangeCardId, setExchangeUserId } = useGPSStore();

	const { id: currentUserId } = useAuthStore();
	const { selectedCard } = useMypageStore() as { selectedCard: { id: number } | null };

	useEffect(() => {
		if (exchangeUserId) {
			const exchangeUser = gpsUserList.find(user => user.id === exchangeUserId);
			const exchangeUserName = exchangeUser?.name ?? exchangeUserId;

			Alert.alert('명함 요청', `${exchangeUserName}님이 교환을 요청했어요!`, [
				{
					text: '수락',
					onPress: () => {
						WebSocketManager.sendMessage({
							type: 'response',
							fromUserId: currentUserId,
							toUserId: exchangeUserId,
							fromCardId: selectedCard?.id ?? 0,
							toCardId: exchangeCardId ?? 0,
							status: 'accept',
						});
						setExchangeUserId(null);
					},
				},
				{
					text: '취소',
					style: 'cancel',
					onPress: () => {
						setExchangeUserId(null);
					},
				},
			]);
		}
	}, [exchangeUserId]);
};

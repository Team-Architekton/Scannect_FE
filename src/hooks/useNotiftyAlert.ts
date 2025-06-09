import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useGPSStore } from '../store/gpsStore';
import { useCardList } from './useCardList';

export const useNotifyAlert = () => {
	const { notifyMessage, setNotifyMessage } = useGPSStore();
	const { handleFetchCards } = useCardList();

	useEffect(() => {
		if (notifyMessage) {
			Alert.alert('알림', notifyMessage, [
				{
					text: '확인',
					onPress: () => {
						setNotifyMessage(null);
						handleFetchCards(false);
					},
				},
			]);
		}
	}, [notifyMessage]);
};

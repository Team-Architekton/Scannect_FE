import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useGPSStore } from '../store/gpsStore';

export const useNotifyAlert = () => {
	const { notifyMessage, setNotifyMessage } = useGPSStore();

	useEffect(() => {
		if (notifyMessage) {
			Alert.alert('알림', notifyMessage, [
				{
					text: '확인',
					onPress: () => setNotifyMessage(null),
				},
			]);
		}
	}, [notifyMessage]);
};

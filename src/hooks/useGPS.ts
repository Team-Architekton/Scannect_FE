import * as Location from 'expo-location';
import { useGPSStore } from '../store/gpsStore';
import { use, useCallback } from 'react';
import { postActivateLocation, postDeactivateLocation } from '../server/location';
import { getUserId } from '../utils/authStorage'; // AsyncStorage 유틸
import { useWebSocket } from './useWebSocket';

export const useGPS = () => {
	const { setLocationOn } = useGPSStore();
	const { connect, disconnect } = useWebSocket();

	const toggleLocation = useCallback(async () => {
		const isCurrentlyOn = useGPSStore.getState().isLocationOn;
		const newStatus = !isCurrentlyOn;

		const userId = await getUserId();
		if (!userId) {
			console.warn('❌ userId 없음 - 위치 공유 불가');
			return;
		}

		if (newStatus) {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				console.log('⛔ 위치 권한 거부됨');
				setLocationOn(false);
				return;
			}

			const location = await Location.getCurrentPositionAsync({});
			const { latitude, longitude } = location.coords;
			console.log('📍 현재 위치:', { latitude, longitude });

			await connect(userId, latitude, longitude);
		} else {
			await disconnect(userId);
		}

		setLocationOn(newStatus);
	}, []);

	return { toggleLocation };
};

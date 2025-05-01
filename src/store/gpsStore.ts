import { create } from 'zustand';
import { IGpsUser } from '../model/gpsUser';
import * as Location from 'expo-location';

type GPSStore = {
	gpsUserList: IGpsUser[];
	selectedUserIds: number[];
	setGPSUserList: (list: IGpsUser[]) => void;
	toggleSelectUser: (id: number) => void;
	toggleLocation: () => void;
	isLocationOn: boolean;
};

export const useGPSStore = create<GPSStore>(set => ({
	gpsUserList: [],
	selectedUserIds: [],
	isLocationOn: false,
	setGPSUserList: list => set({ gpsUserList: list }),
	toggleSelectUser: id =>
		set(state => {
			const isSelected = state.selectedUserIds.includes(id);
			const newSelection = isSelected
				? state.selectedUserIds.filter(userId => userId !== id)
				: [...state.selectedUserIds, id];
			return { selectedUserIds: newSelection };
		}),
	toggleLocation: async () => {
		const newStatus = !useGPSStore.getState().isLocationOn;

		if (newStatus) {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				console.log('⛔ 위치 권한 거부됨');
				useGPSStore.setState({ isLocationOn: false });
				return;
			}

			const location = await Location.getCurrentPositionAsync({});
			const { latitude, longitude } = location.coords;
			console.log('📍 현재 위치:', { latitude, longitude });
		}

		useGPSStore.setState({ isLocationOn: newStatus });
	},
}));

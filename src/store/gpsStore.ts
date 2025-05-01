import { create } from 'zustand';
import { IGpsUser } from '../model/gpsUser';

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
	toggleLocation: () => set(state => ({ isLocationOn: !state.isLocationOn })),
}));

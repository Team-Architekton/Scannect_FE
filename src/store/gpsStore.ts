import { create } from 'zustand';
import { IGpsUser } from '../model/gpsUser';

type GPSStore = {
	gpsUserList: IGpsUser[];
	selectedUserIds: number[];
	isLocationOn: boolean;
	setGPSUserList: (list: IGpsUser[]) => void;
	toggleSelectUser: (id: number) => void;
	setLocationOn: (status: boolean) => void;
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
	setLocationOn: status => set({ isLocationOn: status }),
}));

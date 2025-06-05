import { create } from 'zustand';
import { IGpsUser } from '../model/gpsUser';

type GPSStore = {
	gpsUserList: IGpsUser[];
	selectedUserIds: string[];
	isLocationOn: boolean;
	setGPSUserList: (list: IGpsUser[]) => void;
	toggleSelectUser: (id: string) => void;
	setLocationOn: (status: boolean) => void;
	removeUserById: (userId: string) => void;
};

export const useGPSStore = create<GPSStore>(set => ({
	gpsUserList: [],
	selectedUserIds: [],
	isLocationOn: false,
	setGPSUserList: list => set({ gpsUserList: list }),
	toggleSelectUser: id =>
		set(state => {
			console.log('Toggling selection for user:', id);
			const isSelected = state.selectedUserIds.includes(id);
			const newSelection = isSelected
				? state.selectedUserIds.filter(userId => userId !== id)
				: [...state.selectedUserIds, id];
			return { selectedUserIds: newSelection };
		}),
	setLocationOn: status => set({ isLocationOn: status }),
	removeUserById: (userId: string) =>
		set(state => ({
			gpsUserList: state.gpsUserList.filter(user => user.id !== userId),
		})),
}));

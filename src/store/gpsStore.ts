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
	exchangeUserId: string | null;
	setExchangeUserId: (msg: string | null) => void;
	exchangeCardId: number | null;
	setExchangeCardId: (msg: number | null) => void;
	notifyMessage: null;
	setNotifyMessage: (msg: any) => void;
	clearSelectedUsers: () => void;
};

export const useGPSStore = create<GPSStore>(set => ({
	gpsUserList: [],
	selectedUserIds: [],
	isLocationOn: false,
	setGPSUserList: newList =>
		set(state => {
			const existingIds = new Set(state.gpsUserList.map(user => user.id));

			const filteredNewUsers = newList.filter(user => !existingIds.has(user.id));

			return {
				gpsUserList: [...state.gpsUserList, ...filteredNewUsers],
			};
		}),

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
	exchangeUserId: null,
	setExchangeUserId: msg => set({ exchangeUserId: msg }),
	exchangeCardId: null,
	setExchangeCardId: msg => set({ exchangeCardId: msg }),
	notifyMessage: null,
	setNotifyMessage: msg => set({ notifyMessage: msg }),
	clearSelectedUsers: () => set({ selectedUserIds: [] }),
}));

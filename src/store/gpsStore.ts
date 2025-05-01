import { create } from 'zustand';
import { IGpsUser } from '../model/gpsUser';

type GPSStore = {
	gpsUserList: IGpsUser[];
	selectedUserId: number | null;
	setGPSUserList: (list: IGpsUser[]) => void;
	selectUser: (id: number) => void;
	toggleLocation: () => void;
	isLocationOn: boolean;
};

export const useGPSStore = create<GPSStore>(set => ({
	gpsUserList: [],
	selectedUserId: null,
	isLocationOn: false,
	setGPSUserList: list => set({ gpsUserList: list }),
	selectUser: id => set({ selectedUserId: id }),
	toggleLocation: () => set(state => ({ isLocationOn: !state.isLocationOn })),
}));

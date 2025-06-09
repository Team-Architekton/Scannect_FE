import { httpClient } from './http';

const DEFAULT_DATA = {
	favorite: false,
	memo: '',
	isActive: true,
};

export const saveCard = async (userId: string, cardId: number) => {
	await httpClient.post(`/card-list`, { userId, cardId, ...DEFAULT_DATA });
};

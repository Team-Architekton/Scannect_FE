import { httpClient } from './http';

const defaultData = {
	favorite: false,
	memo: '',
	isActive: true,
};

export const saveCard = async (userId: string, cardId: number) => {
	await httpClient.post(`/card-list`, { userId, cardId, ...defaultData });
};

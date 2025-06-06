import { getUserId } from '../utils/authStorage';
import { httpClient } from './http';

/** 타유저 명함 전체 리스트 조회 API */
export const getCards = async () => {
	const userId = await getUserId();
	if (!userId) return; // id: tester, password: 123456

	const { data } = await httpClient.get(`/card-list/user/${userId}`);
	return data.data;
};

/** 타유저 명함 숨김 상태 업데이트 API */
export const updateIsActive = async (tableId: number, newStatus: boolean) => {
	await httpClient.patch(`/card-list/${tableId}/active?isActive=${newStatus}`);
};

/** 타유저 명함 중요 표시 업데이트 API */
export const updateFavorite = async (tableId: number, newStatus: boolean) => {
	await httpClient.patch(`/card-list/${tableId}/favorite?favorite=${newStatus}`);
};

/** 타유저 명함 삭제 API */
export const deleteCard = async (tableId: number) => {
	await httpClient.delete(`/card-list/${tableId}`);
};

import { httpClient } from './http';
import { CardForm } from '../hooks/useCardForm';
import { getUserId } from '../utils/authStorage';

export const getCards = async () => {
	try {
		const userId = await getUserId();
		const res = await httpClient.get(`/cards/user/${userId}`);
		return res.data.data;
	} catch (error) {
		console.log('전체 명함리스트 조회 실패:', error);
	}
};

export const postCard = async (form: CardForm) => {
	try {
		const userId = await getUserId();
		const payload = {
			userId,
			...form,
		};
		const { data } = await httpClient.post('/cards', payload);
		return data;
	} catch (error) {
		console.error('명함 생성 실패:', error);
	}
};

export const putCard = async (id: number, form: Partial<CardForm>) => {
	try {
		const payload = {
			id,
			...form
		};
		console.log(payload)
		const { data } = await httpClient.put('/cards', payload);
		return {
			success: true,
			data,
		};
	} catch (error: any) {
		console.error('명함 수정 실패:', error);
	}
};

export const patchMainCard = async (cardId: number) => {
	try {
		const userId = await getUserId();
		const { data } = await httpClient.patch(`/cards/${cardId}/main`, null, {
			params: { userId },
		});
		return {
			success: true,
			data,
		};
	} catch (error: any) {
		console.error('기본 명함 설정 실패:', error);
		return {
			success: false,
			message: error?.response?.data?.message ?? '기본 명함 설정 중 오류',
		};
	}
};

export const deleteCard = async (id: number) => {
	try {
		const { data } = await httpClient.delete(`/cards/${id}`);
		return {
			success: true,
			data,
		};
	} catch (error: any) {
		console.error('명함 삭제 실패:', error);
		return {
			success: false,
			message: error?.response?.data?.message ?? '명함 삭제 중 오류',
		};
	}
};

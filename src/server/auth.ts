import { httpClient } from './http';

// 회원가입 API
export const signUp = async (name: string, id: string, password: string) => {
	try {
		const { data } = await httpClient.post('/users', {
			name,
			id,
			password,
		});
		return data;
	} catch (error) {
		console.error('회원가입 실패:', error);
		throw error;
	}
};

// 로그인 API
export const login = async (id: string, password: string) => {
	try {
		const { data } = await httpClient.post('/users/login', {
			id,
			password,
		});
		return data;
	} catch (error) {
		console.error('로그인 실패:', error);
		throw error;
	}
};

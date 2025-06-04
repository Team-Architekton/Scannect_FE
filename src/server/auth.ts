import { httpClient } from './http';

// 회원가입 API
export const signUp = async (name: string, id: string, password: string) => {
	try {
		const { data } = await httpClient.post('/api/users', {
			name,
			id,
			password,
		});
		return data;
	} catch (error) {
		// 에러 핸들링 필요시 여기에 추가
		throw error;
	}
};

// 로그인 API
export const login = async (id: string, password: string) => {
	try {
		const { data } = await httpClient.post('/api/users/login', {
			id,
			password,
		});
		return data;
	} catch (error) {
		// 에러 핸들링 필요시 여기에 추가
		throw error;
	}
};

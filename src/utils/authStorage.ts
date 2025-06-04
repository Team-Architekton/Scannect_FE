import AsyncStorage from '@react-native-async-storage/async-storage';

const IS_LOGGED_IN_KEY = 'isLoggedIn';
const USER_ID_KEY = 'userId';

export const setIsLoggedIn = async (value: boolean) => {
	try {
		await AsyncStorage.setItem(IS_LOGGED_IN_KEY, JSON.stringify(value));
	} catch (e) {
		console.error('로그인 상태 저장 실패', e);
	}
};

export const getIsLoggedIn = async (): Promise<boolean> => {
	try {
		const value = await AsyncStorage.getItem(IS_LOGGED_IN_KEY);
		return value === 'true';
	} catch (e) {
		console.error('로그인 상태 불러오기 실패', e);
		return false;
	}
};

export const setUserId = async (userId: string) => {
	try {
		await AsyncStorage.setItem(USER_ID_KEY, userId);
	} catch (e) {
		console.error('유저 ID 저장 실패', e);
	}
};

export const getUserId = async (): Promise<string | null> => {
	try {
		return await AsyncStorage.getItem(USER_ID_KEY);
	} catch (e) {
		console.error('유저 ID 불러오기 실패', e);
		return null;
	}
};

export const removeUserId = async () => {
	try {
		await AsyncStorage.removeItem(USER_ID_KEY);
	} catch (e) {
		console.error('유저 ID 삭제 실패', e);
	}
};

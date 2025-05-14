import AsyncStorage from '@react-native-async-storage/async-storage';

const IS_LOGGED_IN_KEY = 'isLoggedIn';

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

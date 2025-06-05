import { create } from 'zustand';
import { getIsLoggedIn, getUserId } from '../utils/authStorage';

type AuthError = {
	name?: string;
	id?: string;
	password?: string;
};

type AuthStore = {
	name: string;
	id: string;
	password: string;
	errors: AuthError;
	isLoggedIn: boolean;

	// 상태 제어 함수들
	initLoginStatus: () => void;
	setName: (value: string) => void;
	setId: (value: string) => void;
	setPassword: (value: string) => void;
	setIsLoggedIn: (value: boolean) => void;
	clearErrors: () => void;
	validateFields: (type: 'login' | 'signup') => boolean;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
	name: '',
	id: '',
	password: '',
	errors: {},
	isLoggedIn: false,

	initLoginStatus: async () => {
		const loggedIn = await getIsLoggedIn();
		const storedId = await getUserId();

		set({
			isLoggedIn: loggedIn,
			id: storedId || '',
		});
	},

	setName: value => set({ name: value }),
	setId: value => set({ id: value }),
	setPassword: value => set({ password: value }),
	setIsLoggedIn: value => set({ isLoggedIn: value }),

	clearErrors: () => set({ errors: {} }),

	validateFields: type => {
		const { name, id, password } = get();
		const newErrors: AuthError = {};

		if (type === 'signup' && name.length > 10) newErrors.name = '이름은 10자 이하로 입력해주세요';
		if (id.length < 6 || id.length > 20)
			newErrors.id = '아이디는 6자 이상 20자 이하로 입력해주세요';
		if (password.length < 6 || password.length > 20)
			newErrors.password = '비밀번호는 6자 이상 20자 이하로 입력해주세요';

		set({ errors: newErrors });
		return Object.keys(newErrors).length === 0;
	},
}));

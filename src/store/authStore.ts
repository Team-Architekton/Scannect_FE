import { create } from 'zustand';
import { getIsLoggedIn, setIsLoggedIn } from '../utils/authStorage';

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
	initLoginStatus: () => void;
	setName: (value: string) => void;
	setId: (value: string) => void;
	setPassword: (value: string) => void;
	validateFields: (type: 'login' | 'signup') => boolean;
	clearErrors: () => void;
	signUp: () => void;
	login: () => void;
	logout: () => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
	name: '',
	id: '',
	password: '',
	errors: {},
	isLoggedIn: false,

	initLoginStatus: async () => {
		const loggedIn = await getIsLoggedIn();
		set({ isLoggedIn: loggedIn });
	},

	setName: value => set({ name: value }),
	setId: value => set({ id: value }),
	setPassword: value => set({ password: value }),

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

	signUp: async () => {
		const { name, id, password, validateFields } = get();
		if (validateFields('signup')) {
			console.log('회원가입 요청:', { name, id, password });
			await setIsLoggedIn(true);
			set({ isLoggedIn: true });
		} else {
			console.log('회원가입 유효성 실패');
		}
	},

	login: async () => {
		const { id, password, validateFields } = get();
		if (validateFields('login')) {
			console.log('로그인 요청:', { id, password });
			await setIsLoggedIn(true);
			set({ isLoggedIn: true });
		} else {
			console.log('로그인 유효성 실패');
		}
	},

	logout: async () => {
		await setIsLoggedIn(false);
		set({ isLoggedIn: false });
	},
}));

import { create } from 'zustand';

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
	setName: (value: string) => void;
	setId: (value: string) => void;
	setPassword: (value: string) => void;
	validateFields: () => boolean;
	clearErrors: () => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
	name: '',
	id: '',
	password: '',
	errors: {},

	setName: value => set({ name: value }),
	setId: value => set({ id: value }),
	setPassword: value => set({ password: value }),

	clearErrors: () => set({ errors: {} }),

	validateFields: () => {
		const { name, id, password } = get();
		const newErrors: AuthError = {};

		if (name.length > 10) newErrors.name = '이름은 10자 이하로 입력해주세요';
		if (id.length < 6 || id.length > 20)
			newErrors.id = '아이디는 6자 이상 20자 이하로 입력해주세요';
		if (password.length < 6 || password.length > 20)
			newErrors.password = '비밀번호는 6자 이상 20자 이하로 입력해주세요';

		set({ errors: newErrors });
		return Object.keys(newErrors).length === 0;
	},
}));

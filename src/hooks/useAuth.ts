import { login as postLogin, signUp as postSignUp } from '../server/auth';
import { useAuthStore } from '../store/authStore';
import { setIsLoggedIn } from '../utils/authStorage';

export const useAuth = () => {
	const {
		name,
		id,
		password,
		setName,
		setId,
		setPassword,
		validateFields,
		clearErrors,
		setIsLoggedIn: setLoginState,
	} = useAuthStore();

	const handleSignUp = async () => {
		clearErrors();
		if (!validateFields('signup')) {
			console.log('회원가입 유효성 실패');
			return;
		}

		try {
			const res = await postSignUp(name, id, password);
			if (res.success) {
				await setIsLoggedIn(true);
				setLoginState(true);
			} else {
				console.log(res.message); // 또는 toast 등
			}
		} catch (e) {
			console.error(e);
		}
	};

	const handleLogin = async () => {
		clearErrors();
		if (!validateFields('login')) {
			console.log('로그인 유효성 실패');
			return;
		}

		try {
			const res = await postLogin(id, password);
			if (res.success) {
				await setIsLoggedIn(true);
				setLoginState(true);
			} else {
				console.log(res.message);
			}
		} catch (e) {
			console.error(e);
		}
	};

	return {
		name,
		id,
		password,
		setName,
		setId,
		setPassword,
		errors: useAuthStore.getState().errors, // 상태 그대로 전달
		handleSignUp,
		handleLogin,
	};
};

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigations/types';
import { login as postLogin, signUp as postSignUp } from '../server/auth';
import { useAuthStore } from '../store/authStore';
import { setIsLoggedIn, setUserId } from '../utils/authStorage';

export const useAuth = () => {
	const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

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
				navigation.pop();
			} else {
				console.log(res.message);
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
				await setUserId(res.data.id);
				useAuthStore.getState().setId(res.data.id);
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
		errors: useAuthStore.getState().errors,
		handleSignUp,
		handleLogin,
	};
};

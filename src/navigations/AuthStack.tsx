import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginView from '../screens/Auth/LoginView';
import SignUpView from '../screens/Auth/SignUpView';
import { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="로그인" component={LoginView} />
			<Stack.Screen name="회원가입" component={SignUpView} />
		</Stack.Navigator>
	);
}

import { View, Text, StyleSheet } from 'react-native';
import CommonButton from '../../components/CommonButton';
import typography from '../../styles/typography';
import AuthTextInput from '../../components/auth/AuthTextInput';
import spacing from '../../styles/spacing';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigations/types';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/useAuth';

export default function LoginView() {
	const { id, password, setId, setPassword, errors, handleLogin } = useAuth();
	const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

	return (
		<View style={styles.container}>
			<Text style={[typography.h1, styles.title]}>Scannect</Text>

			<View style={styles.inputGroup}>
				<AuthTextInput
					placeholder="ID를 입력해주세요."
					value={id}
					onChangeText={setId}
					errorMessage={errors.id}
				/>
				<AuthTextInput
					placeholder="비밀번호를 입력해주세요."
					value={password}
					onChangeText={setPassword}
					secureTextEntry
					errorMessage={errors.password}
				/>
			</View>

			<View style={styles.buttonGroup}>
				<CommonButton title="로그인" onPress={handleLogin} size="large" />
				<CommonButton
					title="회원가입"
					onPress={() => navigation.navigate('회원가입')}
					size="large"
					buttonStyle={{ marginTop: spacing.s }}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: spacing.l,
		justifyContent: 'center',
		flex: 1,
	},
	title: {
		textAlign: 'center',
		marginBottom: spacing.l,
	},
	inputGroup: {
		gap: spacing.s,
	},
	buttonGroup: {
		marginTop: spacing.xxl,
	},
});

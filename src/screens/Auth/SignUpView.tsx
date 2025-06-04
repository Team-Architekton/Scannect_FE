import { View, Text, StyleSheet } from 'react-native';
import AuthTextInput from '../../components/auth/AuthTextInput';
import CommonButton from '../../components/CommonButton';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';
import { useAuth } from '../../hooks/useAuth';

export default function SignUpView() {
	const { name, id, password, setName, setId, setPassword, errors, handleSignUp } = useAuth();

	return (
		<View style={styles.container}>
			<View style={styles.inputGroup}>
				<Text style={[typography.h1, styles.title]}>회원 가입</Text>
				<AuthTextInput
					placeholder="이름을 입력해주세요."
					value={name}
					onChangeText={setName}
					errorMessage={errors.name}
				/>
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

			<CommonButton
				title="가입하기"
				onPress={handleSignUp}
				size="large"
				buttonStyle={{ marginBottom: spacing.xxxl }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		paddingHorizontal: spacing.l,
	},
	title: {
		marginBottom: spacing.l,
	},
	inputGroup: {
		marginTop: 100,
		marginBottom: spacing.xxl,
	},
});

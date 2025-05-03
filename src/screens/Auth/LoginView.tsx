import { View, Text, StyleSheet } from 'react-native';
import CommonButton from '../../components/CommonButton';
import { useState } from 'react';
import typography from '../../styles/typography';
import AuthTextInput from '../../components/auth/AuthTextInput';
import spacing from '../../styles/spacing';

export default function LoginView() {
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');

	return (
		<View style={styles.container}>
			<Text style={[typography.h1, styles.title]}>Scannect</Text>

			{/* 입력 필드 영역 */}
			<View style={styles.inputGroup}>
				<AuthTextInput placeholder="ID를 입력해주세요." value={id} onChangeText={setId} />
				<AuthTextInput
					placeholder="비밀번호를 입력해주세요."
					value={password}
					onChangeText={setPassword}
					secureTextEntry
				/>
			</View>

			{/* 버튼 영역 */}
			<View style={styles.buttonGroup}>
				<CommonButton
					title="로그인"
					onPress={() => console.log('로그인')}
					buttonStyle={{ marginBottom: spacing.s }}
					size="large"
				/>
				<CommonButton title="회원가입" onPress={() => console.log('회원가입')} size="large" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 24,
		justifyContent: 'center',
		flex: 1,
	},
	title: {
		textAlign: 'center',
		marginBottom: spacing.l,
	},
	inputGroup: {
		gap: spacing.s, // 입력 필드 간격
	},
	buttonGroup: {
		marginTop: spacing.xl, // 입력 필드와 버튼 간격
	},
});

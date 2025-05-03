import { View, Text, StyleSheet } from 'react-native';
import CommonButton from '../../components/CommonButton';
import { useState } from 'react';
import typography from '../../styles/typography';
import AuthTextInput from '../../components/auth/AuthTextInput';
import spacing from '../../styles/spacing';
import { useAuthStore } from '../../store/authStore';

export default function LoginView() {
	const { id, password, setId, setPassword, errors, login } = useAuthStore();

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
				<CommonButton title="로그인" onPress={login} size="large" />
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
		marginTop: spacing.xxl,
	},
});

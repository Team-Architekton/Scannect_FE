import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthTextInput from '../../components/auth/AuthTextInput';
import CommonButton from '../../components/CommonButton';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';
import { useAuthStore } from '../../store/authStore';

export default function SignUpView() {
	const { name, id, password, setName, setId, setPassword, errors, signUp } = useAuthStore();

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
				onPress={signUp}
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
		paddingHorizontal: 20,
		paddingTop: 80,
	},
	title: {
		marginTop: 50,
		marginBottom: 20,
	},
	inputGroup: {
		marginTop: 100,
		marginBottom: 40,
	},
});

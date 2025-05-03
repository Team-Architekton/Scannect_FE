import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthTextInput from '../../components/auth/AuthTextInput';
import CommonButton from '../../components/CommonButton';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

export default function SignUpView() {
	const [name, setName] = useState('');
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');

	const handleSignUp = () => {
		console.log('가입 정보:', { name, id, password });
		// AuthStore.createUser(id, password, name); 등으로 연결
	};

	return (
		<View style={styles.container}>
			<View style={styles.inputGroup}>
				<Text style={[typography.h1, styles.title]}>회원 가입</Text>
				<AuthTextInput placeholder="이름을 입력해주세요." value={name} onChangeText={setName} />
				<AuthTextInput placeholder="ID를 입력해주세요." value={id} onChangeText={setId} />
				<AuthTextInput
					placeholder="비밀번호를 입력해주세요."
					value={password}
					onChangeText={setPassword}
					secureTextEntry
				/>
			</View>

			<CommonButton
				title="가입하기"
				onPress={handleSignUp}
				buttonStyle={{ marginBottom: spacing.xxxl }}
				size="large"
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

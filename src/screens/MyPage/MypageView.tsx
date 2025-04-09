import { Text, View, Button } from 'react-native';

export default function MyPage({ navigation }: any) {
	return (
		<View>
			<Text>마이페이지</Text>
			<Button title="명함 생성" onPress={() => navigation.navigate('명함 생성')} />
		</View>
	);
}

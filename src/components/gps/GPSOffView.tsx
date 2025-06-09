import { StyleSheet, View, Text } from 'react-native';
import colors from '../../styles/Colors';
import CommonButton from '../CommonButton';
import { useAuthStore } from '../../store/authStore';

export default function GPSOffView() {
	const handleLogout = () => {
		useAuthStore.getState().setIsLoggedIn(false);
		console.log('로그아웃 되었습니다.');
	};

	return (
		<View style={styles.wrapper}>
			<View style={styles.textContainer}>
				<Text style={styles.text}>위치가 비활성화되어 있어요.</Text>
				<Text style={styles.text}>위치를 켜고 근처 유저를 확인해보세요.</Text>
			</View>
			<CommonButton
				title="로그아웃"
				onPress={handleLogout}
				buttonStyle={styles.hiddenButton}
				textStyle={{ fontSize: 1 }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	textContainer: {
		alignItems: 'center',
	},
	text: {
		fontSize: 14,
		color: colors.grayscaleGray4,
		marginVertical: 5,
	},
	hiddenButton: {
		position: 'absolute',
		bottom: 100,
		width: 300,
		height: 300,
		opacity: 1,
		backgroundColor: 'transparent',
	},
});

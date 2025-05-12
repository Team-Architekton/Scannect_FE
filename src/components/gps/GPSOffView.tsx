import { StyleSheet, View, Text } from 'react-native';
import colors from '../../styles/Colors';

export default function GPSOffView() {
	return (
		<View style={styles.wrapper}>
			<Text style={styles.text}>위치가 비활성화되어 있어요.</Text>
			<Text style={styles.text}>위치를 켜고 근처 유저를 확인해보세요.</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 14,
		color: colors.grayscaleGray4,
		marginVertical: 5,
	},
});

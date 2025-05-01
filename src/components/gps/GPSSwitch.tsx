import { View, Text, StyleSheet, Switch } from 'react-native';
import colors from '../../styles/Colors';

export default function GPSSwitch() {
	return (
		<View style={styles.wrapper}>
			<Text style={styles.label}>위치 활성화</Text>
			<Switch />
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	label: {
		color: colors.grayscaleGray4,
		marginRight: 8,
	},
});

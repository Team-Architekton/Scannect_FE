import { View, Text, StyleSheet, Switch } from 'react-native';
import colors from '../../styles/Colors';
import { useGPSStore } from '../../store/gpsStore';
import spacing from '../../styles/spacing';

export default function GPSSwitch() {
	const { isLocationOn, toggleLocation } = useGPSStore();

	return (
		<View style={styles.wrapper}>
			<Text style={styles.label}>위치 활성화</Text>
			<Switch
				value={isLocationOn}
				onValueChange={toggleLocation}
				thumbColor={isLocationOn ? colors.primary : colors.grayscaleGray1}
			/>
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
		marginRight: spacing.s,
	},
});

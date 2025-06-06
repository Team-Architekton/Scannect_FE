import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import colors from '../../styles/Colors';

const LoadingOverlay = () => {
	return (
		<View style={styles.overlay}>
			<ActivityIndicator size="large" color={colors.primary} />
			<Text style={styles.text}>명함 정보를 추출 중입니다...</Text>
		</View>
	);
};

export default LoadingOverlay;

const styles = StyleSheet.create({
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 999,
	},
	text: {
		marginTop: 12,
		color: 'white',
		fontSize: 16,
		fontWeight: '600',
	},
});

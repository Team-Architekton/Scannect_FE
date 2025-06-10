import { Image, StyleSheet, View } from 'react-native';
import spacing from '../styles/spacing';

export default function LogoImage() {
	return (
		<View style={styles.container}>
			<Image
				source={require('../assets/appLogo.png')}
				resizeMode="contain"
				style={styles.logoImage}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
		marginBottom: spacing.xl,
	},
	logoImage: {
		width: 180,
		height: 80,
	},
});

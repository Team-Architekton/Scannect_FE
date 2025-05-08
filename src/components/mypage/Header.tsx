import { View, StyleSheet  } from 'react-native';
import Dropdown from './elements/Dropdown';
import Hamburger from './elements/Hamburger';
import spacing from '../../styles/spacing';

export default function Header() {
	return (
		<View style={styles.container}>
			<Dropdown />
			<Hamburger />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: spacing.sm,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		zIndex: 1,
	},
});

import { View, StyleSheet } from 'react-native';

import CommonButton from '../CommonButton';
import spacing from '../../styles/spacing';
import colors from '../../styles/Colors';

export default function Contacts() {
	return (
		<View style={styles.container}>
			<CommonButton
				title="전화 연결"
				size="small"
				onPress={() => {}}
				buttonStyle={{ backgroundColor: colors.paleDarkGreen }}
				textStyle={{ color: colors.darkGreen }}
			/>
			<CommonButton
				title="메일 전송"
				size="small"
				onPress={() => {}}
				buttonStyle={{ backgroundColor: colors.paleDarkGreen }}
				textStyle={{ color: colors.darkGreen }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: spacing.sm,
		gap: spacing.s,
	},
});

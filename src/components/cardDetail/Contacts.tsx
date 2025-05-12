import { View, StyleSheet, Linking } from 'react-native';

import CommonButton from '../CommonButton';
import spacing from '../../styles/spacing';
import colors from '../../styles/Colors';

interface IContactProps {
	phone: string;
	email: string;
}

export default function Contacts({ phone, email }: IContactProps) {
	return (
		<View style={styles.container}>
			<CommonButton
				title="전화 연결"
				size="small"
				onPress={() => Linking.openURL(`tel:${phone}`)}
				buttonStyle={styles.contactButton}
				textStyle={{ color: colors.darkGreen }}
			/>
			<CommonButton
				title="메일 전송"
				size="small"
				onPress={() => Linking.openURL(`mailto:${email}`)}
				buttonStyle={styles.contactButton}
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
	contactButton: {
		backgroundColor: colors.paleDarkGreen,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.15,
		shadowRadius: 4,
		elevation: 3,
	},
});

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

import commonStyles from '../../styles/commonStyles';
import spacing from '../../styles/spacing';
import colors from '../../styles/Colors';

interface IHeaderProps {
	name: string;
}

export default function Header({ name }: IHeaderProps) {
	return (
		<View style={styles.headerContainer}>
			<TouchableOpacity onPress={() => {}}>
				<AntDesign name="heart" size={24} color={colors.primary} />
			</TouchableOpacity>
			<Text style={commonStyles.subtitleText}>{name}</Text>
			<TouchableOpacity onPress={() => {}}>
				<Feather name="more-vertical" size={24} color="black" />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: spacing.ml,
		marginBottom: spacing.l,
	},
});

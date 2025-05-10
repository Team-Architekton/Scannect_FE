import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

import commonStyles from '../../styles/commonStyles';
import spacing from '../../styles/spacing';
import colors from '../../styles/Colors';
import { useModalStore } from '../../store/modalStore';

interface IHeaderProps {
	name: string;
	cardId: number;
	isShown: boolean;
}

export default function Header({ name, cardId, isShown }: IHeaderProps) {
	const { openModal } = useModalStore();
	return (
		<View style={styles.headerContainer}>
			<TouchableOpacity onPress={() => {}}>
				<AntDesign name="heart" size={24} color={colors.primary} />
			</TouchableOpacity>
			<Text
				style={[
					commonStyles.subtitleText,
					{ color: isShown ? colors.black : colors.grayscaleGray6 },
				]}
			>
				{name}
			</Text>
			<TouchableOpacity onPress={() => openModal(cardId)}>
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

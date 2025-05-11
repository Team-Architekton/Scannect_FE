import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

import commonStyles from '../../styles/commonStyles';
import spacing from '../../styles/spacing';
import colors from '../../styles/Colors';
import { useModalStore } from '../../store/modalStore';
import HeartIcon from '../cardList/elements/HeartIcon';

interface IHeaderProps {
	name: string;
	cardId: number;
	favorite: boolean;
	isActive: boolean;
}

export default function Header({ name, cardId, favorite, isActive }: IHeaderProps) {
	const { openModal } = useModalStore();
	return (
		<View style={styles.headerContainer}>
			<HeartIcon cardId={cardId} isFavorite={favorite} />
			<Text
				style={[
					commonStyles.subtitleText,
					{ color: isActive ? colors.black : colors.grayscaleGray6 },
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

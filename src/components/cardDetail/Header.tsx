import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import commonStyles from '../../styles/commonStyles';
import spacing from '../../styles/spacing';
import colors from '../../styles/Colors';
import { useModalStore } from '../../store/modalStore';
import HeartIcon from '../cardList/elements/HeartIcon';

interface IHeaderProps {
	id: number;
	nickname: string;
	cardId: number;
	favorite: boolean;
	isActive: boolean;
}

export default function Header({ nickname, id, cardId, favorite, isActive }: IHeaderProps) {
	const { openModal } = useModalStore();
	return (
		<View style={styles.headerContainer}>
			<HeartIcon id={id} favorite={favorite} size={24} />
			<Text
				style={[
					commonStyles.subtitleText,
					{ color: isActive ? colors.black : colors.grayscaleGray6 },
				]}
			>
				{nickname}
			</Text>
			<TouchableOpacity hitSlop={spacing.m} onPress={() => openModal(cardId)}>
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

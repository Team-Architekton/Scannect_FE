import { Alert, Pressable, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import colors from '../../../styles/Colors';
import { useCardStore } from '../../../store/cardStore';
import spacing from '../../../styles/spacing';

interface IProp {
	cardId: number;
	isFavorite: boolean;
	size?: number;
}

export default function HeartIcon({ cardId, isFavorite, size = 30 }: IProp) {
	const { updateFavorite } = useCardStore();
	const toggleHeart = () => {
		const newState = !isFavorite;
		updateFavorite(cardId, newState);
		Alert.alert(newState ? '중요 인맥으로 설정되었습니다.' : '중요 인맥에서 해제되었습니다.');
	};
	return (
		<Pressable hitSlop={spacing.m} onPress={toggleHeart} style={styles.heartButton}>
			{isFavorite ? (
				<AntDesign name="heart" size={size} color={colors.primary} />
			) : (
				<AntDesign name="hearto" size={size} color={colors.darkGreen} />
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	heartButton: {
		paddingRight: spacing.xs,
	},
});

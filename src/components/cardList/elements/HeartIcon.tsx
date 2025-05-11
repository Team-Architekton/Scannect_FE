import { useState } from 'react';
import { Alert, Pressable, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import colors from '../../../styles/Colors';
import { useCardStore } from '../../../store/cardStore';

interface IProp {
	cardId: number;
	isFavorite: boolean;
}

export default function HeartIcon({ cardId, isFavorite }: IProp) {
	const { updateFavorite } = useCardStore();
	const toggleHeart = () => {
		const newState = !isFavorite;
		updateFavorite(cardId, newState);
		Alert.alert(newState ? '중요 인맥으로 설정되었습니다.' : '중요 인맥에서 해제되었습니다.');
	};
	return (
		<Pressable onPress={toggleHeart} style={styles.heartButton}>
			{isFavorite ? (
				<AntDesign name="heart" size={24} color={colors.primary} />
			) : (
				<AntDesign name="hearto" size={24} color={colors.darkGreen} />
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	heartButton: {
		paddingRight: 5,
	},
});

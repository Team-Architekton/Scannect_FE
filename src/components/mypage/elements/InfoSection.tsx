import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import spacing from '../../../styles/spacing';
import typography from '../../../styles/typography';
import colors from '../../../styles/Colors';
import { useMypageStore } from '../../../store/useMyPageStore';

export default function IntroductionSection() {
	const { selectedCard } = useMypageStore();

	if (!selectedCard) return null;

	return (
		<View style={styles.container}>
			<Image source={{ uri: selectedCard.profileImage }} style={styles.profileImage} />
			<View style={styles.textContainer}>
				<Text style={[typography.h2, styles.title]}>자기소개</Text>
				<Text style={styles.introText}>{selectedCard.introduction}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.m,
        marginTop: spacing.ml,
	},
	profileImage: {
		width: 90,
		height: 90,
		borderRadius: 45,
		backgroundColor: colors.grayscaleGray1,
	},
	textContainer: {
		flex: 1,
        gap: 7,
	},
    title: {
        borderBottomWidth: 3,
        borderBottomColor: colors.grayscaleGray4
    },
	introText: {
		marginTop: spacing.xs,
		fontSize: 14,
		lineHeight: 20,
	},
});

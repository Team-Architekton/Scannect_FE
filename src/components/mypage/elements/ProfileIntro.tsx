import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import spacing from '../../../styles/spacing';
import typography from '../../../styles/typography';
import colors from '../../../styles/Colors';
import { useMypageStore } from '../../../store/useMyPageStore';

const DEFAULT_PROFILE_IMAGE = require('../../../assets/emptyProfile.png');

export default function ProfileIntro() {
	const { selectedCard } = useMypageStore();

	if (!selectedCard) return null;

	const imageSource =
		selectedCard.profileImage && selectedCard.profileImage.trim() !== ''
			? { uri: selectedCard.profileImage }
			: DEFAULT_PROFILE_IMAGE;

	return (
		<View style={styles.container}>
			<Image source={imageSource} style={styles.profileImage} />
			<View style={styles.textContainer}>
				<Text style={[typography.h2, styles.text]}>자기소개</Text>
				<View style={styles.divider} />
				<Text style={styles.introText}>{selectedCard.introduction}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		gap: spacing.m,
		marginTop: spacing.s,
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
    text: {
        marginTop: spacing.l,
		marginBottom: spacing.xs,
    },
	divider: {
		height: 2,
		backgroundColor: colors.grayscaleGray3,
		marginBottom: spacing.s,
	},
	introText: {
		marginTop: spacing.xs,
		fontSize: 14,
		lineHeight: 20,
	},
});

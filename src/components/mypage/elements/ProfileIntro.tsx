import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import spacing from '../../../styles/spacing';
import typography from '../../../styles/typography';
import colors from '../../../styles/Colors';
import LabeledTextarea from '../../cardCreateUpdate/LabeledTextarea';
import ProfileImagePicker from '../../cardCreateUpdate/Profile';

const DEFAULT_PROFILE_IMAGE = require('../../../assets/emptyProfile.png');

type Props = {
	content: string;
	imgUrl: string | null;
	onChangeContent: (text: string) => void;
	onChangeImg: (uri: string | null) => void;
	isEditing: boolean;
};

export default function ProfileIntro({
	content,
	imgUrl,
	onChangeContent,
	onChangeImg,
	isEditing,
}: Props) {
	const imageSource = imgUrl && imgUrl.trim() !== '' ? { uri: imgUrl } : DEFAULT_PROFILE_IMAGE;

	return (
		<View style={styles.container}>
			{isEditing ? (
				<ProfileImagePicker imageUri={imgUrl} onChange={onChangeImg} />
			) : (
				<Image source={imageSource} style={styles.profileImage} />
			)}

			<View style={styles.textContainer}>
				<Text style={[typography.h2, styles.text]}>자기소개</Text>
				<View style={styles.divider} />
				{isEditing ? (
					<LabeledTextarea
						label=""
						value={content}
						onChangeText={onChangeContent}
						placeholder="자기소개를 입력하세요"
					/>
				) : (
					<Text style={styles.introText}>{content}</Text>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
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

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import spacing from '../../../styles/spacing';
import typography from '../../../styles/typography';
import colors from '../../../styles/Colors';
import { useMypageStore } from '../../../store/useMyPageStore';
import LabeledTextarea from '../../cardCreateUpdate/LabeledTextarea';
import ProfileImagePicker from '../../cardCreateUpdate/Profile';

const DEFAULT_PROFILE_IMAGE = require('../../../assets/emptyProfile.png');

export default function ProfileIntro() {
	const selectedCard = useMypageStore(state => state.selectedCard);
	const isEditing = useMypageStore(state => state.isEditing);
	const [editedCard, setEditedCard] = React.useState(selectedCard);

	React.useEffect(() => {
		if (selectedCard) setEditedCard(selectedCard);
	}, [selectedCard]);

	if (!selectedCard) return null;

	const imageSource =
		selectedCard.imgUrl && selectedCard.imgUrl.trim() !== ''
			? { uri: selectedCard.imgUrl }
			: DEFAULT_PROFILE_IMAGE;

	return (
		<View style={styles.container}>
			{isEditing ? (
				<ProfileImagePicker
					imageUri={editedCard?.imgUrl || null}
					onChange={uri => setEditedCard(prev => (prev ? { ...prev, imgUrl: uri } : null))}
				/>
			) : (
				<Image source={imageSource} style={styles.profileImage} />
			)}
			<View style={styles.textContainer}>
				<Text style={[typography.h2, styles.text]}>자기소개</Text>
				<View style={styles.divider} />
				{isEditing ? (
					<LabeledTextarea
						label=""
						value={editedCard?.content || ''}
						onChangeText={text => setEditedCard(prev => (prev ? { ...prev, content: text } : null))}
						placeholder="자기소개를 입력하세요"
					/>
				) : (
					<Text style={styles.introText}>{selectedCard.content}</Text>
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

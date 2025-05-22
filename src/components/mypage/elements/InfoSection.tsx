import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { useMypageStore } from '../../../store/useMyPageStore';
import spacing from '../../../styles/spacing';
import colors from '../../../styles/Colors';
import typography from '../../../styles/typography';
import EditableField from '../../cardCreateUpdate/EditableField';
import CommonButton from '../../CommonButton';

export default function InfoSection() {
	const selectedCard = useMypageStore(state => state.selectedCard);
	const isEditing = useMypageStore(state => state.isEditing);
	const setIsEditing = useMypageStore(state => state.setIsEditing);

	const [editedCard, setEditedCard] = useState(selectedCard);

	useEffect(() => {
		if (selectedCard) setEditedCard(selectedCard);
	}, [selectedCard]);

	if (!selectedCard) return null;

	return (
		<View style={styles.container}>
			<Text style={[typography.h2, styles.sectionTitle]}>명함 정보</Text>
			<View style={styles.divider} />
			<EditableField
				label="이름"
				value={editedCard?.name || ''}
				onChange={text => setEditedCard(prev => (prev ? { ...prev, name: text } : null))}
				isEditing={isEditing}
			/>

			<EditableField
				label="소속"
				value={editedCard?.belongTo || ''}
				onChange={text => setEditedCard(prev => (prev ? { ...prev, belongTo: text } : null))}
				isEditing={isEditing}
			/>

			<EditableField
				label="부서"
				value={editedCard?.department || ''}
				onChange={text => setEditedCard(prev => (prev ? { ...prev, department: text } : null))}
				isEditing={isEditing}
			/>

			<EditableField
				label="직책"
				value={editedCard?.job || ''}
				onChange={text => setEditedCard(prev => (prev ? { ...prev, job: text } : null))}
				isEditing={isEditing}
			/>

			<View style={styles.infoRow}>
				<Text style={styles.label}>업종/직무</Text>
				<Text style={styles.value}>
					{selectedCard.industry}/{selectedCard.position}
				</Text>
			</View>

			<Text style={[typography.h2, styles.sectionTitle]}>연락처</Text>
			<View style={styles.divider} />

			<EditableField
				label="휴대폰"
				value={editedCard?.phoneNum || ''}
				onChange={text => setEditedCard(prev => (prev ? { ...prev, phoneNum: text } : null))}
				isEditing={isEditing}
			/>

			<EditableField
				label="유선전화"
				value={editedCard?.companyTel || ''}
				onChange={text => setEditedCard(prev => (prev ? { ...prev, companyTel: text } : null))}
				isEditing={isEditing}
			/>

			<EditableField
				label="이메일"
				value={editedCard?.email || ''}
				onChange={text => setEditedCard(prev => (prev ? { ...prev, email: text } : null))}
				isEditing={isEditing}
			/>

			<EditableField
				label="URL"
				value={editedCard?.website || ''}
				onChange={text => setEditedCard(prev => (prev ? { ...prev, website: text } : null))}
				isEditing={isEditing}
			/>

			{isEditing && (
				<View style={styles.buttonRow}>
					<CommonButton
						title="취소"
						onPress={() => {
							Alert.alert(
								'수정 취소',
								'지금까지 수정한 내용이 사라집니다. 취소하시겠습니까?',
								[
									{ text: '아니요' },
									{
										text: '네',
										onPress: () => {
											if (selectedCard) setEditedCard(selectedCard);
											setIsEditing(false);
										},
									},
								]
							);
						}}
						size="small"
					/>
					<CommonButton
						title="저장"
						onPress={() => {
							setIsEditing(false);
						}}
						size="small"
					/>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		padding: spacing.m,
		borderRadius: 12,
		gap: spacing.s,
	},
	sectionTitle: {
		marginTop: spacing.l,
		marginBottom: spacing.xs,
	},
	divider: {
		height: 2,
		backgroundColor: colors.grayscaleGray3,
		marginBottom: spacing.s,
	},
	infoRow: {
		flexDirection: 'row',
		gap: 20,
		marginBottom: spacing.xs,
	},
	label: {
		color: colors.grayscaleGray5,
		fontSize: 14,
	},
	value: {
		color: colors.black,
		fontSize: 14,
	},
	input: {
		borderBottomWidth: 1,
		borderBottomColor: colors.grayscaleGray3,
		fontSize: 14,
		color: colors.black,
		paddingVertical: 2,
		minWidth: 100,
	},
	buttonRow: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 10,
		marginTop: 16,
	},
});

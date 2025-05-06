import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useMypageStore } from '../../../store/useMyPageStore';
import spacing from '../../../styles/spacing';
import colors from '../../../styles/Colors';
import typography from '../../../styles/typography';

export default function CardInfoSection() {
	const { selectedCard } = useMypageStore();

	if (!selectedCard) return null;

	return (
		<View style={styles.container}>
			<Text style={[typography.h2, styles.sectionTitle]}>명함 정보</Text>
			<View style={styles.divider} />
			<View style={styles.infoRow}>
				<Text style={styles.label}>이름</Text>
				<Text style={styles.value}>{selectedCard.name}</Text>
			</View>
			<View style={styles.infoRow}>
				<Text style={styles.label}>소속</Text>
				<Text style={styles.value}>{selectedCard.company}</Text>
			</View>
			<View style={styles.infoRow}>
				<Text style={styles.label}>부서</Text>
				<Text style={styles.value}>{selectedCard.department}</Text>
			</View>
			<View style={styles.infoRow}>
				<Text style={styles.label}>직책</Text>
				<Text style={styles.value}>{selectedCard.title}</Text>
			</View>
			<View style={styles.infoRow}>
				<Text style={styles.label}>업종/직무</Text>
				<Text style={styles.value}>{selectedCard.category}</Text>
			</View>

			<Text style={[typography.h2, styles.sectionTitle]}>연락처</Text>
			<View style={styles.divider} />
			<View style={styles.infoRow}>
				<Text style={styles.label}>휴대폰</Text>
				<Text style={styles.value}>{selectedCard.phone}</Text>
			</View>
			<View style={styles.infoRow}>
				<Text style={styles.label}>유선전화</Text>
				<Text style={styles.value}>{selectedCard.landline}</Text>
			</View>
			<View style={styles.infoRow}>
				<Text style={styles.label}>이메일</Text>
				<Text style={styles.value}>{selectedCard.email}</Text>
			</View>
			<View style={styles.infoRow}>
				<Text style={styles.label}>URL</Text>
				<Text style={styles.value}>{selectedCard.website}</Text>
			</View>
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
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';

import colors from '../../styles/Colors';
import spacing from '../../styles/spacing';

interface IPreview {
	nickname: string;
	belongTo: string;
	job: string;
	phoneNum?: string;
	email?: string;
	url?: string;
	colour?: string;
}

interface IPreviewProps<T extends IPreview> {
	selectedCard: T | null;
}

export default function CardPreview<T extends IPreview>({ selectedCard }: IPreviewProps<T>) {
	if (!selectedCard) return null;

	return (
		<View style={[styles.card, { backgroundColor: selectedCard.colour || colors.grayscaleGray3 }]}>
			<Text style={styles.company}>{selectedCard.belongTo}</Text>

			<View style={styles.infoRow}>
				<View style={styles.leftInfo}>
					<Text style={styles.name}>{selectedCard.nickname}</Text>
					<Text style={styles.title}>{selectedCard.job}</Text>
				</View>

				<View style={styles.rightInfo}>
					<View style={styles.contactRow}>
						<Feather name="phone" size={12} color="black" />
						<Text style={styles.contactText}>{selectedCard.phoneNum}</Text>
					</View>
					<View style={styles.contactRow}>
						<Feather name="mail" size={12} color="black" />
						<Text style={styles.contactText}>{selectedCard.email}</Text>
					</View>
					<View style={styles.contactRow}>
						<Entypo name="link" size={12} color="black" />
						<Text style={styles.contactText}>{selectedCard.url}</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		padding: spacing.m,
		borderRadius: 10,
		width: '100%',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 3,
	},
	company: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: spacing.sm,
	},
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	leftInfo: {
		justifyContent: 'flex-end',
		borderLeftWidth: 2,
		borderLeftColor: colors.black,
		paddingLeft: spacing.sm,
		marginRight: spacing.m,
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 2,
	},
	title: {
		fontSize: 12,
	},
	rightInfo: {
		alignItems: 'flex-start',
		gap: 4,
	},
	contactRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		marginBottom: 2,
	},
	contactText: {
		fontSize: 12,
	},
});

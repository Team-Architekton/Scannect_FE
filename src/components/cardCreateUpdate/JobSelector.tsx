import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableOpacity } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { jobOptions } from '../../constants/jopOptions';
import colors from '../../styles/Colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

interface Props {
	industry: string;
	position: string;
	onChangeIndustry: (value: string) => void;
	onChangePosition: (value: string) => void;
	industryError?: string;
	positionError?: string;
	showLabel?: boolean;
}

export default function JobSelector({
	industry,
	position,
	onChangeIndustry,
	onChangePosition,
	industryError,
	positionError,
	showLabel,
}: Props) {
	const [jobItems, setJobItems] = useState<{ label: string; value: string }[]>([]);

	const industryItems = jobOptions.map(opt => ({
		label: opt.industry,
		value: opt.industry,
	}));

	useEffect(() => {
		const selected = jobOptions.find(opt => opt.industry === industry);
		setJobItems(selected ? selected.roles.map(role => ({ label: role, value: role })) : []);
	}, [industry]);

	const { showActionSheetWithOptions } = useActionSheet();

	const openIndustrySheet = () => {
		const options = industryItems.map(i => i.label).concat('취소');
		showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex: options.length - 1,
			},
			idx => {
				if (idx !== undefined && idx < industryItems.length) {
					onChangeIndustry(industryItems[idx].value);
				}
			}
		);
	};

	const openPositionSheet = () => {
		if (jobItems.length === 0) return;
		const options = jobItems.map(i => i.label).concat('취소');
		showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex: options.length - 1,
			},
			idx => {
				if (idx !== undefined && idx < jobItems.length) {
					onChangePosition(jobItems[idx].value);
				}
			}
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.pickerWrapper}>
				{showLabel !== false && (
					<Text style={styles.label}>
						업종 <Text style={styles.required}>*</Text>
					</Text>
				)}
				<TouchableOpacity style={styles.dropdown} onPress={openIndustrySheet}>
					<Text style={industry ? styles.selectedTextStyle : styles.placeholderStyle}>
						{industry || '업종을 선택하세요'}
					</Text>
				</TouchableOpacity>
				{industryError && <Text style={styles.errorText}>{industryError}</Text>}
			</View>
			<View style={styles.pickerWrapper}>
				{showLabel !== false && (
					<Text style={styles.label}>
						직무 <Text style={styles.required}>*</Text>
					</Text>
				)}
				<TouchableOpacity
					style={[styles.dropdown, jobItems.length === 0 && { backgroundColor: '#f0f0f0' }]}
					onPress={openPositionSheet}
					disabled={jobItems.length === 0}
				>
					<Text style={position ? styles.selectedTextStyle : styles.placeholderStyle}>
						{position || '직무를 선택하세요'}
					</Text>
				</TouchableOpacity>
				{positionError && <Text style={styles.errorText}>{positionError}</Text>}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: spacing.s,
		marginBottom: spacing.m,
	},
	pickerWrapper: {
		flex: 1,
	},
	label: {
		...typography.body,
		marginBottom: spacing.s,
		paddingLeft: spacing.xs,
		color: colors.black,
	},
	required: {
		color: '#FF3B30',
	},
	dropdown: {
		height: 44,
		paddingHorizontal: spacing.s,
		borderWidth: 1,
		borderColor: colors.grayscaleGray2,
		borderRadius: 8,
		backgroundColor: colors.white,
		justifyContent: 'center',
	},
	errorBorder: {
		borderColor: colors.error,
	},
	errorText: {
		marginTop: spacing.xs,
		fontSize: 12,
		color: colors.error,
	},
	placeholderStyle: {
		fontSize: 14,
		color: colors.grayscaleGray3,
	},
	selectedTextStyle: {
		fontSize: 14,
		color: colors.black,
	},
});

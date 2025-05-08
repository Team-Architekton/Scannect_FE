import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { jobOptions } from '../../constants/jopOptions';
import colors from '../../styles/Colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

interface Props {
	industry?: string;
	job: string;
	onChangeIndustry: (value: string) => void;
	onChangeJob: (value: string) => void;
}

export default function IndustryJobPicker({ industry, job, onChangeIndustry, onChangeJob }: Props) {
	const [roles, setRoles] = useState<string[]>([]);

	useEffect(() => {
		const selected = jobOptions.find(opt => opt.industry === industry);
		setRoles(selected ? selected.roles : []);
	}, [industry]);

	return (
		<View style={styles.row}>
			<View style={styles.pickerWrapper}>
				<Text style={styles.label}>업종 *</Text>
				<RNPickerSelect
					onValueChange={onChangeIndustry}
					items={jobOptions.map(opt => ({
						label: opt.industry,
						value: opt.industry,
					}))}
					placeholder={{ label: '업종을 선택하세요', value: '' }}
					value={industry}
					style={pickerSelectStyles}
					useNativeAndroidPickerStyle={false}
				/>
			</View>

			<View style={styles.pickerWrapper}>
				<Text style={styles.label}>직무 *</Text>
				<RNPickerSelect
					onValueChange={onChangeJob}
					items={roles.map(role => ({
						label: role,
						value: role,
					}))}
					placeholder={{ label: '직무를 선택하세요', value: '' }}
					value={job}
					style={pickerSelectStyles}
					disabled={roles.length === 0}
					useNativeAndroidPickerStyle={false}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		gap: spacing.s,
		marginBottom: spacing.m,
	},
	pickerWrapper: {
		flex: 1,
	},
	label: {
		...typography.body2,
		marginBottom: spacing.xs,
		paddingLeft: spacing.xs,
		color: colors.black,
	},
});

const pickerSelectStyles = {
	inputIOS: {
		height: 44,
		borderWidth: 1,
		borderColor: colors.grayscaleGray2,
		borderRadius: 8,
		paddingHorizontal: spacing.s,
		fontSize: 14,
		backgroundColor: colors.white,
	},
	inputAndroid: {
		height: 44,
		borderWidth: 1,
		borderColor: colors.grayscaleGray2,
		borderRadius: 8,
		paddingHorizontal: spacing.s,
		fontSize: 14,
		backgroundColor: colors.white,
	},
	placeholder: {
		color: colors.grayscaleGray3,
	},
};

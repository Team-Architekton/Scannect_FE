import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { jobOptions } from '../../constants/jopOptions';
import colors from '../../styles/Colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

interface Props {
	industry: string;
	job: string;
	onChangeIndustry: (value: string) => void;
	onChangeJob: (value: string) => void;
	industryError?: string;
	jobError?: string;
}

export default function JobSelector({ industry, job, onChangeIndustry, onChangeJob, industryError, jobError }: Props) {
	const [jobItems, setJobItems] = useState<{ label: string; value: string }[]>([]);

	const industryItems = jobOptions.map(opt => ({
		label: opt.industry,
		value: opt.industry,
	}));

	useEffect(() => {
		const selected = jobOptions.find(opt => opt.industry === industry);
		setJobItems(selected ? selected.roles.map(role => ({ label: role, value: role })) : []);
	}, [industry]);

	return (
		<View style={styles.container}>
			<View style={styles.pickerWrapper}>
				<Text style={styles.label}>
					업종 <Text style={styles.required}>*</Text>
				</Text>
				<Dropdown
					style={[styles.dropdown, industryError && styles.errorBorder]}
					data={industryItems}
					labelField="label"
					valueField="value"
					placeholder="업종을 선택하세요"
					value={industry}
					onChange={item => onChangeIndustry(item.value)}
					placeholderStyle={styles.placeholderStyle}
					selectedTextStyle={styles.selectedTextStyle}
				/>
				{industryError && <Text style={styles.errorText}>{industryError}</Text>}
			</View>
			<View style={styles.pickerWrapper}>
				<Text style={styles.label}>
					직무 <Text style={styles.required}>*</Text>
				</Text>
				<Dropdown
					style={[styles.dropdown, jobError && styles.errorBorder]}
					data={jobItems}
					labelField="label"
					valueField="value"
					placeholder="직무를 선택하세요"
					value={job}
					onChange={item => onChangeJob(item.value)}
					disable={jobItems.length === 0}
					placeholderStyle={styles.placeholderStyle}
					selectedTextStyle={styles.selectedTextStyle}
				/>
				{jobError && <Text style={styles.errorText}>{jobError}</Text>}
			</View>
		</View>
	);
};

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

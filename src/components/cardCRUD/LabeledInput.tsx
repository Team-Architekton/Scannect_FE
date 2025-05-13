import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import colors from '../../styles/Colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

interface Props extends TextInputProps {
	label: string;
	required?: boolean;
	errorMessage?: string;
    onBlur?: () => void;
}

export default function LabeledInput({
	label,
	required = false,
	errorMessage,
    onBlur,
	...inputProps
}: Props) {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>
				{label}
				{required && <Text style={styles.required}> *</Text>}
			</Text>
			<TextInput
				{...inputProps}
				style={[styles.input, errorMessage && styles.errorBorder]}
				placeholderTextColor={colors.grayscaleGray3}
                onBlur={onBlur}
			/>
			{errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: spacing.m,
	},
	label: {
		...typography.body,
		marginBottom: spacing.s,
        paddingLeft: spacing.xs,
		color: colors.black,
	},
	required: {
		color: colors.error,
	},
	input: {
		height: 44,
		paddingHorizontal: spacing.s,
		borderWidth: 1,
		borderColor: colors.grayscaleGray2,
		borderRadius: 8,
		backgroundColor: colors.white,
	},
	errorBorder: {
		borderColor: colors.error,
	},
	errorText: {
		marginTop: spacing.xs,
		fontSize: 12,
		color: colors.error,
	},
});

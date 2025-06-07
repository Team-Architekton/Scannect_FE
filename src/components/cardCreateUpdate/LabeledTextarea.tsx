import { View, Text, TextInput, StyleSheet } from 'react-native';
import spacing from '../../styles/spacing';
import colors from '../../styles/Colors';
import typography from '../../styles/typography';

interface Props {
	label: string;
	value: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
	required?: boolean;
	errorMessage?: string;
	onFocus?: () => void;
}

export default function LabeledTextarea({
	label,
	value,
	onChangeText,
	placeholder,
	required,
	errorMessage,
}: Props) {
	return (
		<View style={styles.wrapper}>
			{label ? (
				<Text style={styles.label}>
					{label}
					{required && <Text style={styles.required}> *</Text>}
				</Text>
			) : null}
			<TextInput
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor={colors.grayscaleGray3}
				multiline
				numberOfLines={4}
				style={[styles.input, errorMessage && styles.errorInput]}
				textAlignVertical="top"
			/>
			{errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
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
		height: 100,
		borderWidth: 1,
		borderColor: colors.grayscaleGray2,
		borderRadius: 8,
		padding: spacing.s,
		fontSize: 14,
		backgroundColor: colors.white,
	},
	errorInput: {
		borderColor: colors.error,
	},
	errorText: {
		color: colors.error,
		marginTop: 4,
		fontSize: 12,
	},
});

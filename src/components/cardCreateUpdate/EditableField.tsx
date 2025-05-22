import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import colors from '../../styles/Colors';
import spacing from '../../styles/spacing';

type EditableFieldProps = {
	label: string;
	value: string | undefined;
	onChange: (text: string) => void;
	isEditing: boolean;
	inputProps?: TextInputProps;
	errorMessage?: string;
};

const EditableField: React.FC<EditableFieldProps> = ({
	label,
	value,
	onChange,
	isEditing,
	inputProps = {},
	errorMessage,
}) => {
	return (
		<View style={styles.infoRow}>
			<Text style={styles.label}>{label}</Text>
			{isEditing ? (
				<View style={{flexDirection: 'column'}}>
					<TextInput
						style={[styles.input, errorMessage && styles.inputError]}
						value={value}
						onChangeText={onChange}
						{...inputProps}
					/>
					{errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
				</View>
			) : (
				<Text style={styles.value}>{value}</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	infoRow: {
		flexDirection: 'row',
		gap: 20,
		marginBottom: spacing.s,
	},
	label: {
		fontSize: 14,
		color: colors.grayscaleGray5,
	},
	value: {
		fontSize: 14,
		color: colors.black,
	},
	input: {
		fontSize: 14,
		color: colors.black,
		borderBottomWidth: 1,
		borderBottomColor: colors.grayscaleGray3,
		paddingBottom: 3,
		minWidth: 150,
	},
	inputError: {
		borderBottomColor: colors.error,
	},
	errorText: {
		color: colors.error,
		fontSize: 12,
		marginTop: 3,
	},
});

export default EditableField;

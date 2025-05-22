import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import colors from '../../styles/Colors';

type EditableFieldProps = {
	label: string;
	value: string;
	onChange: (text: string) => void;
	isEditing: boolean;
	inputProps?: TextInputProps;
};

const EditableField: React.FC<EditableFieldProps> = ({ label,value,onChange,isEditing,inputProps = {}, }) => {
	return (
		<View style={styles.infoRow}>
			<Text style={styles.label}>{label}</Text>
			{isEditing ? (
				<TextInput style={styles.input} value={value} onChangeText={onChange} {...inputProps} />
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
		marginBottom: 8,
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
		borderBottomColor: '#ccc',
		paddingVertical: 2,
		minWidth: 150,
	},
});

export default EditableField;

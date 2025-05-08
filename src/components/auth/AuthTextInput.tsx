import { TextInput, StyleSheet, View, Text } from 'react-native';
import colors from '../../styles/Colors';
import spacing from '../../styles/spacing';

interface Props {
	placeholder: string;
	value: string;
	onChangeText: (text: string) => void;
	secureTextEntry?: boolean;
	errorMessage?: string;
}

export default function AuthTextInput({
	placeholder,
	value,
	onChangeText,
	secureTextEntry,
	errorMessage,
}: Props) {
	return (
		<View style={styles.wrapper}>
			<TextInput
				placeholder={placeholder}
				value={value}
				autoCapitalize="none"
				onChangeText={onChangeText}
				secureTextEntry={secureTextEntry}
				style={[styles.input, errorMessage && styles.errorInput]}
			/>
			{errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		marginBottom: spacing.s,
	},
	input: {
		height: spacing.xxxl,
		borderBottomWidth: 1,
		borderBottomColor: colors.grayscaleGray4,
		marginBottom: spacing.m,
		paddingHorizontal: spacing.s,
	},
	errorInput: {
		borderColor: 'red',
	},
	errorText: {
		color: 'red',
		marginTop: spacing.xs,
		fontSize: 12,
	},
});

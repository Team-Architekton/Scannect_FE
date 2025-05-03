import { TextInput, StyleSheet } from 'react-native';
import colors from '../../styles/Colors';
import spacing from '../../styles/spacing';

interface Props {
	placeholder: string;
	value: string;
	onChangeText: (text: string) => void;
	secureTextEntry?: boolean;
}

export default function AuthTextInput({
	placeholder,
	value,
	onChangeText,
	secureTextEntry,
}: Props) {
	return (
		<TextInput
			style={styles.input}
			placeholder={placeholder}
			value={value}
			onChangeText={onChangeText}
			secureTextEntry={secureTextEntry}
			placeholderTextColor={colors.grayscaleGray4}
		/>
	);
}

const styles = StyleSheet.create({
	input: {
		height: 48,
		borderBottomWidth: 1,
		borderBottomColor: colors.grayscaleGray4,
		marginBottom: spacing.m,
		paddingHorizontal: spacing.s,
	},
});

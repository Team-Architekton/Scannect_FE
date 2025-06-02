import { Alert, Pressable, TextInput, StyleSheet } from 'react-native';
import { useRef, useState } from 'react';
import Fontisto from '@expo/vector-icons/Fontisto';

import colors from '../../styles/Colors';
import spacing from '../../styles/spacing';

export default function SearchInput() {
	const inputRef = useRef<TextInput>(null);
	const [keyword, setKeyword] = useState('');
	const onChangeKeyword = (payload: string) => setKeyword(payload);
	return (
		<Pressable
			style={styles.inputContainer}
			onPress={() => {
				inputRef.current?.focus();
			}}
		>
			<Fontisto name="search" size={18} color={colors.grayscaleGray6} />
			<TextInput
				ref={inputRef}
				placeholder="키워드를 입력해주세요..."
				value={keyword}
				onChangeText={onChangeKeyword}
				onSubmitEditing={() =>
					Alert.alert(!keyword ? '검색할 키워드를 입력해주세요.' : `키워드: ${keyword}`)
				}
				keyboardType="default"
				returnKeyType="search"
				style={styles.searchInput}
			/>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.grayscaleGray1,
		paddingHorizontal: spacing.ml,
		paddingVertical: spacing.sm,
		marginVertical: spacing.ml,
		marginTop: spacing.l,
		borderRadius: spacing.xl,
	},
	searchInput: {
		paddingLeft: spacing.sm,
		fontSize: spacing.m,
	},
});

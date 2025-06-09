import { Pressable, TextInput, StyleSheet } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import Fontisto from '@expo/vector-icons/Fontisto';

import colors from '../../../styles/Colors';
import spacing from '../../../styles/spacing';
import { useCardList } from '../../../hooks/useCardList';
import { useCardStore } from '../../../store/cardStore';

export default function SearchInput() {
	const inputRef = useRef<TextInput>(null);
	const { handleSearchCards } = useCardList();
	const isSearching = useCardStore(state => state.isSearching);

	const [keyword, setKeyword] = useState('');
	const handleChange = (payload: string) => setKeyword(payload);

	useEffect(() => {
		if (!isSearching) setKeyword('');
	}, [isSearching]);

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
				onChangeText={handleChange}
				onSubmitEditing={() => handleSearchCards(keyword)}
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

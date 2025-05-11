import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useRef, useState } from 'react';

import spacing from '../../styles/spacing';
import colors from '../../styles/Colors';
import CommonButton from '../CommonButton';
import typography from '../../styles/typography';
import { useCardStore } from '../../store/cardStore';

interface IMemoProps {
	cardId: number;
	memo: string | undefined;
	onFocus: () => void;
}

export default function MemoInput({ cardId, memo, onFocus }: IMemoProps) {
	const memoRef = useRef<TextInput>(null);
	const [newMemo, setNewMemo] = useState(memo);
	const [isEditing, setIsEditing] = useState(false);
	const { updateMemo } = useCardStore();

	const onChangeMemo = (payload: string) => setNewMemo(payload);
	const onSubmitMemo = () => {
		if (newMemo && newMemo !== memo) updateMemo(cardId, newMemo);
		setIsEditing(false);
	};

	return (
		<View style={styles.container}>
			<View style={styles.sectionTitle}>
				<Text style={typography.h2}>메모</Text>
				{isEditing ? (
					<CommonButton title="저장" size="small" onPress={onSubmitMemo} />
				) : (
					<CommonButton
						title="수정"
						size="small"
						onPress={() => {
							setIsEditing(true);
							setTimeout(() => {
								memoRef.current?.focus();
							}, 100);
						}}
					/>
				)}
			</View>
			<View style={styles.divider} />
			{!isEditing ? (
				memo ? (
					<Text>{memo}</Text>
				) : (
					<Text style={{ color: colors.grayscaleGray6 }}>자유롭게 메모를 추가해보세요!</Text>
				)
			) : (
				<TextInput
					ref={memoRef}
					style={styles.memo}
					placeholder="자유롭게 메모를 추가해보세요!"
					multiline={true}
					value={newMemo}
					onChangeText={onChangeMemo}
					onFocus={onFocus}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: spacing.m,
		gap: spacing.s,
		marginBottom: spacing.xl,
	},
	sectionTitle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: spacing.xs,
	},
	divider: {
		height: 2,
		backgroundColor: colors.grayscaleGray3,
		marginBottom: spacing.s,
	},
	memo: {
		minHeight: 100,
		padding: spacing.m,
		borderRadius: 10,
		backgroundColor: colors.grayscaleGray2,
		color: colors.black,
	},
});

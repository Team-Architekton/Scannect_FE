import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';

import spacing from '../../styles/spacing';
import colors from '../../styles/Colors';
import CommonButton from './../CommonButton';
import typography from '../../styles/typography';

export default function MemoInput() {
	const [memo, setMemo] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const onChangeMemo = (payload: string) => setMemo(payload);
	return (
		<View style={styles.container}>
			<View style={styles.sectionTitle}>
				<Text style={typography.h2}>메모</Text>
				{isEditing ? (
					<CommonButton title="저장" size="small" onPress={() => setIsEditing(false)} />
				) : (
					<CommonButton title="수정" size="small" onPress={() => setIsEditing(true)} />
				)}
			</View>
			<View style={styles.divider} />
			<TextInput
				style={styles.memoInput}
				placeholder="자유롭게 메모를 추가해보세요!"
				multiline={true}
				value={memo}
				onChangeText={onChangeMemo}
				onSubmitEditing={() => {}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: spacing.m,
		gap: spacing.s,
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
	memoInput: {
		minHeight: 100,
		padding: spacing.m,
		borderRadius: 10,
		backgroundColor: colors.grayscaleGray1,
		color: colors.black,
	},
});

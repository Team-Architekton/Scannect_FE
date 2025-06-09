import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import commonStyles from '../../styles/commonStyles';
import { useCardStore } from '../../store/cardStore';
import CardItem from './sectionListView/CardItem';
import spacing from '../../styles/spacing';

export default function SearchListView() {
	const { searchList, setIsSearching } = useCardStore();
	return (
		<ScrollView contentContainerStyle={styles.container}>
			{searchList.length === 0 ? (
				<Text style={[commonStyles.bodyText, styles.noResultText]}>검색 결과가 없습니다.</Text>
			) : (
				searchList.map(card => <CardItem key={card.id} {...card} />)
			)}
			<Pressable style={{ marginTop: spacing.l }} onPress={() => setIsSearching(false)}>
				<Text style={commonStyles.captionText}>홈으로 돌아가기</Text>
			</Pressable>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop: spacing.m,
	},
	noResultText: {
		marginTop: spacing.xxxl,
		marginBottom: spacing.m,
	},
});

import {
	Text,
	View,
	StyleSheet,
	Platform,
	UIManager,
	Alert,
	ActivityIndicator,
} from 'react-native';
import { useEffect } from 'react';

import commonStyles from '../../styles/commonStyles';
import colors from '../../styles/Colors';
import ScreenContainer from '../../components/ScreenContainer';
import SearchInput from '../../components/cardList/elements/SearchInput';
import SortOption from '../../components/cardList/elements/SortOption';
import CardSectionList from '../../components/cardList/sectionListView/SectionList';
import CardBottomSheet from '../../components/cardList/CardBottomSheet';
import EmptyListView from '../../components/cardList/EmptyListView';
import SearchListView from '../../components/cardList/SearchListView';
import { useCardStore } from '../../store/cardStore';
import { useCardList } from '../../hooks/useCardList';
import spacing from '../../styles/spacing';

// 안드로이드 환경에서도 레이아웃 애니메이션 동작하도록 설정
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

function LoadingView() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator size="large" />
		</View>
	);
}

export default function CardListView({ navigation }: any) {
	const { cardList, searchList, isLoading, isSearching } = useCardStore();
	const { handleFetchCards } = useCardList();

	useEffect(() => {
		const load = async () => {
			const success = await handleFetchCards(true);
			if (!success) Alert.alert('처리 실패', '잠시 후 다시 시도해주세요.');
		};
		load();
	}, []);

	return (
		<ScreenContainer>
			<View style={{ height: '100%' }}>
				<Text style={styles.headerTitle}>명함 리스트</Text>
				<SearchInput />

				<View style={styles.mainLabelWrapper}>
					<Text style={styles.mainLabel}>
						{isSearching ? `검색 결과 (${searchList.length})` : `전체 명함 (${cardList.length})`}
					</Text>
					{!isSearching && <SortOption />}
				</View>
				{isLoading ? (
					<LoadingView />
				) : cardList.length === 0 ? (
					<EmptyListView navigation={navigation} />
				) : isSearching ? (
					<SearchListView />
				) : (
					<CardSectionList />
				)}
			</View>
			<CardBottomSheet />
		</ScreenContainer>
	);
}

const styles = StyleSheet.create({
	headerTitle: { ...commonStyles.titleText, marginTop: 30 },
	mainLabelWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: spacing.xs,
	},
	mainLabel: { ...commonStyles.bodyText, color: colors.grayscaleGray7 },
});

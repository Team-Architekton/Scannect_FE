import { Text, View, StyleSheet, Platform, UIManager, Alert } from 'react-native';
import { useEffect } from 'react';

import commonStyles from '../../styles/commonStyles';
import colors from '../../styles/Colors';
import ScreenContainer from '../../components/ScreenContainer';
import SearchInput from '../../components/cardList/SearchInput';
import SortOption from '../../components/cardList/elements/SortOption';
import CardSectionList from '../../components/cardList/sectionListView/SectionList';
import CardBottomSheet from '../../components/cardList/elements/CardBottomSheet';
import EmptyListView from '../../components/cardList/EmptyListView';
import { useCardStore } from '../../store/cardStore';
import { getCards } from '../../server/cardList';

// 안드로이드 환경에서도 레이아웃 애니메이션 동작하도록 설정
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function CardListView({ navigation }: any) {
	const { cardList, setCardList } = useCardStore();

	useEffect(() => {
		const fetchCards = async () => {
			try {
				const cards = await getCards();
				setCardList(cards ? cards : []);
			} catch (e) {
				console.log('명함 리스트 조회 실패', e);
				Alert.alert('오류', '명함 리스트를 불러오는 데 실패했습니다.');
			}
		};
		fetchCards();
	}, []);

	return (
		<ScreenContainer>
			<View style={{ height: '100%' }}>
				<Text style={styles.headerTitle}>명함 리스트</Text>
				<SearchInput />
				<View style={styles.mainLabelWrapper}>
					<Text style={styles.mainLabel}>전체 명함 ({cardList.length})</Text>
					<SortOption />
				</View>
				{cardList.length === 0 ? <EmptyListView navigation={navigation} /> : <CardSectionList />}
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
	},
	mainLabel: { ...commonStyles.bodyText, color: colors.grayscaleGray7 },
});

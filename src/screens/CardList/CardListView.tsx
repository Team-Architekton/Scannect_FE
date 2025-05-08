import { Text, View, StyleSheet, Platform, UIManager } from 'react-native';
import { useEffect } from 'react';

import commonStyles from '../../styles/commonStyles';
import colors from '../../styles/Colors';
import ScreenContainer from '../../components/ScreenContainer';
import SearchInput from '../../components/cardList/SearchInput';
import SortDropDown from '../../components/cardList/SortDropDown';
import CardSectionList from '../../components/cardList/CardSectionList';
import CardBottomSheet from '../../components/cardList/CardBottomSheet';
import EmptyListView from '../../components/cardList/EmptyListView';
import { useCardStore } from '../../store/cardStore';
import { dummyData } from '../../model/cardItem';

// 안드로이드 환경에서도 레이아웃 애니메이션 동작하도록 설정
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function CardListView() {
	const { cardList, setCardList } = useCardStore();

	useEffect(() => {
		setCardList(dummyData);
	}, []);

	return (
		<ScreenContainer>
			<View style={{ height: '100%' }}>
				<Text style={styles.headerTitle}>명함 리스트</Text>
				<SearchInput />
				<View style={styles.mainLabelWrapper}>
					<Text style={styles.mainLabel}>전체 명함 ({cardList.length})</Text>
					<SortDropDown />
				</View>
				{cardList.length === 0 ? <EmptyListView /> : <CardSectionList />}
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

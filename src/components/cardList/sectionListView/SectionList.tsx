import { Alert, LayoutAnimation, SectionList, StyleSheet, View } from 'react-native';
import { useCallback, useMemo, useState } from 'react';

import CardItem from './CardItem';
import SectionHeader from './SectionHeader';
import colors from '../../../styles/Colors';
import { useCardStore } from '../../../store/cardStore';
import spacing from '../../../styles/spacing';
import { useCardList } from '../../../hooks/useCardList';

export default function CardSectionList() {
	const { handleFetchCards } = useCardList();
	const {
		renderingList: { importantCards, commonCards, hiddenCards },
		error,
		clearError,
	} = useCardStore();
	const [refreshing, setRefreshing] = useState(false);
	const [arcodianOpen, setArcodianOpen] = useState({
		important: true,
		hidden: false,
	});

	const toggleArcodian = (section: keyof typeof arcodianOpen) => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setArcodianOpen(prev => ({ ...prev, [section]: !prev[section] }));
	};

	const handleRefresh = useCallback(async () => {
		setRefreshing(true);
		await handleFetchCards();
		if (error) {
			Alert.alert(error, '잠시 후 다시 시도해주세요.');
			clearError();
		}
		setRefreshing(false);
	}, [handleFetchCards]);

	const sections = useMemo(() => {
		return [
			{
				key: 'important',
				title: '중요 인맥',
				data: arcodianOpen.important ? importantCards : [],
			},
			{
				key: 'common',
				title: '명함',
				data: commonCards,
			},
			{
				key: 'hidden',
				title: '숨긴 명함',
				data: arcodianOpen.hidden ? hiddenCards : [],
			},
		];
	}, [importantCards, commonCards, hiddenCards, arcodianOpen]);

	return (
		<SectionList
			sections={sections}
			keyExtractor={item => item.id.toString()}
			renderItem={({ item }) => <CardItem {...item} />}
			renderSectionHeader={({ section }) => (
				<SectionHeader
					sectionKey={section.key}
					title={section.title}
					length={
						section.key === 'important'
							? importantCards.length
							: section.key === 'hidden'
								? hiddenCards.length
								: commonCards.length
					}
					isArcodianOpen={
						arcodianOpen[section.key === 'important' ? 'important' : 'hidden'] || undefined
					}
					onToggle={() => toggleArcodian(section.key === 'important' ? 'important' : 'hidden')}
				/>
			)}
			renderSectionFooter={({ section }) => {
				if (section.key !== 'hidden') {
					return <View style={styles.divider}>{/* 구분선 View */}</View>;
				}
				return null;
			}}
			stickySectionHeadersEnabled={false}
			showsVerticalScrollIndicator={false}
			refreshing={refreshing}
			onRefresh={handleRefresh}
		/>
	);
}

const styles = StyleSheet.create({
	divider: {
		borderBottomWidth: 1,
		borderColor: colors.grayscaleGray2,
		marginVertical: spacing.s,
	},
});

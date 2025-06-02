import { LayoutAnimation, SectionList, StyleSheet, View } from 'react-native';
import { useMemo, useState } from 'react';

import CardItem from './CardItem';
import SectionHeader from './SectionHeader';
import colors from '../../../styles/Colors';
import { useCardStore } from '../../../store/cardStore';
import spacing from '../../../styles/spacing';

export default function CardSectionList() {
	const {
		renderingList: { importantCards, commonCards, hiddenCards },
	} = useCardStore();
	const [arcodianOpen, setArcodianOpen] = useState({
		important: true,
		hidden: false,
	});
	const toggleArcodian = (section: keyof typeof arcodianOpen) => {
		// 아코디언 접기/펼치기 레이아웃 변경 시 애니메이션 적용
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setArcodianOpen(prev => ({ ...prev, [section]: !prev[section] }));
	};
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

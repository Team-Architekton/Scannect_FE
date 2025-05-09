import { RouteProp, useRoute } from '@react-navigation/native';
import { StyleSheet, ScrollView } from 'react-native';
import { useEffect } from 'react';

import ScreenContainer from '../../components/ScreenContainer';
import { CardListStackParamList } from '../../navigations/types';
import { useCardStore } from '../../store/cardStore';
import Header from '../../components/cardDetail/Header';
import MemoInput from '../../components/cardDetail/MemoInput';
import CardPreview from '../../components/mypage/CardPreview';
import ProfileIntro from '../../components/mypage/ProfileSection';
import Contects from '../../components/cardDetail/Contects';

type CardDetailRouteProp = RouteProp<CardListStackParamList, '명함 상세'>;

export default function CardDetailView() {
	const route = useRoute<CardDetailRouteProp>();
	const { cardId } = route.params;
	const card = useCardStore(state => state.cardList.find(c => c.id === cardId));

	if (!card) return null;
	return (
		<ScreenContainer>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Header name={card.name} />
				<CardPreview />
				<Contects />
				<ProfileIntro />
				<MemoInput />
			</ScrollView>
		</ScreenContainer>
	);
}

const styles = StyleSheet.create({});

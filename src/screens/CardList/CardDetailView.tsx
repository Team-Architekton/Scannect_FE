import { ScrollView } from 'react-native';
import { useEffect } from 'react';

import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/cardDetail/Header';
import MemoInput from '../../components/cardDetail/MemoInput';
import CardPreview from '../../components/mypage/CardPreview';
import ProfileIntro from '../../components/mypage/ProfileSection';
import Contacts from '../../components/cardDetail/Contacts';
import CardBottomSheet from '../../components/cardList/elements/CardBottomSheet';
import { useCardStore } from '../../store/cardStore';

export default function CardDetailView({ navigation, route }: any) {
	const { cardId } = route.params;
	const card = useCardStore(state => state.cardList.find(c => c.id === cardId));

	useEffect(() => {
		if (!card) navigation.goBack();
	}, [card]);

	if (!card) return null;
	return (
		<ScreenContainer>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Header
					name={card.name}
					cardId={card.id}
					favorite={card.favorite}
					isActive={card.isActive}
				/>
				<CardPreview />
				<Contacts />
				<ProfileIntro />
				<MemoInput />
			</ScrollView>
			<CardBottomSheet />
		</ScreenContainer>
	);
}

import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useEffect, useRef } from 'react';

import ScreenContainer from '../../components/ScreenContainer';
import CardBottomSheet from '../../components/cardList/elements/CardBottomSheet';
import Header from '../../components/cardDetail/Header';
import MemoInput from '../../components/cardDetail/Memo';
import ProfileInfo from '../../components/cardDetail/ProfileInfo';
import { useCardStore } from '../../store/cardStore';

export default function CardDetailView({ navigation, route }: any) {
	const scrollRef = useRef<ScrollView>(null);
	const { cardId } = route.params;
	const card = useCardStore(state => state.cardList.find(c => c.id === cardId));

	useEffect(() => {
		if (!card) navigation.goBack();
	}, [card]);

	const handleFocus = () => {
		setTimeout(() => {
			scrollRef.current?.scrollToEnd({ animated: true });
		}, 300);
	};

	if (!card) return null;
	return (
		<ScreenContainer>
			<KeyboardAvoidingView
				behavior={Platform.select({ ios: 'padding', android: undefined })}
				keyboardVerticalOffset={80}
				style={{ flex: 1 }}
			>
				<ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
					<Header
						name={card.name}
						cardId={card.id}
						favorite={card.favorite}
						isActive={card.isActive}
					/>
					<ProfileInfo card={card} />
					<MemoInput cardId={card.id} memo={card.memo} onFocus={handleFocus} />
				</ScrollView>
			</KeyboardAvoidingView>
			<CardBottomSheet />
		</ScreenContainer>
	);
}

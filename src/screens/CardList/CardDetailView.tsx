import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useEffect, useRef } from 'react';

import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/cardDetail/Header';
import MemoInput from '../../components/cardDetail/Memo';
import CardPreview from '../../components/mypage/CardPreview';
import ProfileIntro from '../../components/mypage/ProfileSection';
import Contacts from '../../components/cardDetail/Contacts';
import CardBottomSheet from '../../components/cardList/elements/CardBottomSheet';
import { useCardStore } from '../../store/cardStore';

export default function CardDetailView({ navigation, route }: any) {
	const scrollRef = useRef<ScrollView>(null);
	const { cardId } = route.params;
	const card = useCardStore(state => state.cardList.find(c => c.id === cardId));

	useEffect(() => {
		if (!card) navigation.goBack();
	}, [card]);

	const onFocus = () => {
		// 키보드 올라올 때 화면 맨 아래로 스크롤
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
					<CardPreview />
					<Contacts phone={card.phone} email={card.email} />
					<ProfileIntro />
					<MemoInput cardId={card.id} memo={card.memo} onFocus={onFocus} />
				</ScrollView>
			</KeyboardAvoidingView>
			<CardBottomSheet />
		</ScreenContainer>
	);
}

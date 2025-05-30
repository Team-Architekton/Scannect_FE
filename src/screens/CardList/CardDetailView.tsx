import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useEffect, useRef } from 'react';

import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/cardDetail/Header';
import MemoInput from '../../components/cardDetail/Memo';
import CardPreview from '../../components/mypage/CardPreview';
import Contacts from '../../components/cardDetail/Contacts';
import CardBottomSheet from '../../components/cardList/elements/CardBottomSheet';
import ProfileIntro from './../../components/mypage/elements/ProfileIntro';
import InfoSection from '../../components/mypage/elements/InfoSection';
import { useCardStore } from '../../store/cardStore';
import { useCardForm } from '../../hooks/useCardForm';

export default function CardDetailView({ navigation, route }: any) {
	const scrollRef = useRef<ScrollView>(null);
	const { cardId } = route.params;
	const card = useCardStore(state => state.cardList.find(c => c.id === cardId));
	const { form, errors } = useCardForm({ ...card });

	useEffect(() => {
		if (!card) navigation.goBack();
	}, [card]);

	const handleFocus = () => {
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
					<CardPreview selectedCard={card} />
					<Contacts phone={card.phoneNum} email={card.email} />
					<ProfileIntro
						content={card.content ?? ''}
						imgUrl={card.imgUrl ?? null}
						onChangeContent={text => {}}
						onChangeImg={uri => {}}
						isEditing={false}
					/>
					<InfoSection
						form={form}
						errors={errors}
						isEditing={false}
						handleChange={(key, value) => {}}
						validateField={(key, value) => {}}
					/>
					<MemoInput cardId={card.id} memo={card.memo} onFocus={handleFocus} />
				</ScrollView>
			</KeyboardAvoidingView>
			<CardBottomSheet />
		</ScreenContainer>
	);
}

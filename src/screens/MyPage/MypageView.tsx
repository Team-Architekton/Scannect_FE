import {
	ActivityIndicator,
	Pressable,
	View,
	Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/mypage/Header';
import CardPreview from '../../components/mypage/CardPreview';
import ProfileSection from '../../components/mypage/ProfileSection';
import spacing from '../../styles/spacing';
import { useUiStore } from '../../store/useUiStore';
import { useMypageStore } from '../../store/useMyPageStore';
import { useMypage } from '../../hooks/useMypage';
import { useEffect } from 'react';
import EmptyView from '../../components/mypage/EmptyView';

export default function MyPage() {
	const { clearAllPopups } = useUiStore();
	const cards = useMypageStore(state => state.cards);
	const selectedCard = useMypageStore(state => state.selectedCard);
	const isLoading = useMypageStore(state => state.isLoading);
	const { fetchCards } = useMypage();
	useEffect(() => {
		fetchCards(null, true);
	}, []);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (!cards || cards.length === 0) {
		return (
			<ScreenContainer>
				<EmptyView message={`아직 등록된 명함이 없습니다. \n 새 명함을 추가해보세요!`} />
			</ScreenContainer>
		);
	}

	return (
		<ScreenContainer>
				<KeyboardAwareScrollView
					contentContainerStyle={{ paddingBottom: spacing.s }}
					keyboardShouldPersistTaps="handled"
					extraScrollHeight={30}
					enableOnAndroid={true}
					showsVerticalScrollIndicator={false}
				>
					<Pressable
						onPress={() => {
							Keyboard.dismiss();
							clearAllPopups();
						}}
						style={{ flex: 1, gap: spacing.m }}
					>
						<Header />
						<CardPreview selectedCard={selectedCard} />
						<ProfileSection selectedCard={selectedCard} />
					</Pressable>
				</KeyboardAwareScrollView>
		</ScreenContainer>
	);
}

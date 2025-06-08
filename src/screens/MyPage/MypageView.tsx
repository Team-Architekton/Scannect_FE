import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/mypage/Header';
import CardPreview from '../../components/mypage/CardPreview';
import ProfileSection from '../../components/mypage/ProfileSection';
import spacing from '../../styles/spacing';
import { useUiStore } from '../../store/useUiStore';
import { useMypageStore } from '../../store/useMyPageStore';
import { useMypage } from '../../hooks/useMypage';
import { useEffect } from 'react';

export default function MyPage() {
	const { clearAllPopups } = useUiStore();
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

	return (
		<ScreenContainer>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={{ flex: 1 }}
				keyboardVerticalOffset={80}
			>
				<ScrollView
					contentContainerStyle={{ paddingVertical: spacing.l }}
					showsVerticalScrollIndicator={false}
				>
					<Pressable onPress={clearAllPopups} style={{ flex: 1, gap: spacing.m }}>
						<Header />
						<CardPreview selectedCard={selectedCard} />
						<ProfileSection selectedCard={selectedCard} />
					</Pressable>
				</ScrollView>
			</KeyboardAvoidingView>
		</ScreenContainer>
	);
}

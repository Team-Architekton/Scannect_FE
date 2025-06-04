import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/mypage/Header';
import CardPreview from '../../components/mypage/CardPreview';
import ProfileSection from '../../components/mypage/ProfileSection';
import spacing from '../../styles/spacing';
import { useUiStore } from '../../store/useUiStore';
import { useMypageStore } from '../../store/useMyPageStore';

export default function MyPage() {
	const { clearAllPopups } = useUiStore();
	const { selectedCard } = useMypageStore();

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
						<ProfileSection />
					</Pressable>
				</ScrollView>
			</KeyboardAvoidingView>
		</ScreenContainer>
	);
}

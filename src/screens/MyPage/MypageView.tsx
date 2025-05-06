import { Pressable, ScrollView, View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/mypage/Header';
import CardPreview from '../../components/mypage/CardPreview';
import ProfileSection from '../../components/mypage/ProfileSection';
import spacing from '../../styles/spacing';
import { useUiStore } from '../../store/useUiStore';

export default function MyPage() {
	const { clearAllPopups } = useUiStore();

	return (
		<ScreenContainer>
			<ScrollView
				contentContainerStyle={{ paddingVertical: spacing.l }}
				showsVerticalScrollIndicator={false}
			>
				<Pressable onPress={clearAllPopups} style={{ flex: 1, gap: spacing.m }}>
					<Header />
					<CardPreview />
					<ProfileSection />
				</Pressable>
			</ScrollView>
		</ScreenContainer>
	);
};

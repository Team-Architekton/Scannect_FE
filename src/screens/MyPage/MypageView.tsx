import { Pressable, View } from 'react-native';
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
			<Pressable onPress={clearAllPopups} style={{ flex: 1 }}>
				<View style={{ gap: spacing.m }}>
					<Header />
					<CardPreview />
					<ProfileSection />
				</View>
			</Pressable>
		</ScreenContainer>
	);
}

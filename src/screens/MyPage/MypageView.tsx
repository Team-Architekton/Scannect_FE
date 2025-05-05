import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/mypage/Header';
import CardPreview from '../../components/mypage/CardPreview';
import ProfileSection from '../../components/mypage/ProfileSection';
import spacing from '../../styles/spacing';
import { View } from 'react-native';

export default function MyPage() {
	return (
		<ScreenContainer>
			<View style={{ gap: spacing.m }}>
				<Header />
				<CardPreview />
				<ProfileSection />
			</View>
		</ScreenContainer>
	);
}

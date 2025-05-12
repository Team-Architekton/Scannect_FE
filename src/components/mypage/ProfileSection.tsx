import { View } from 'react-native';
import ProfileIntro from './elements/ProfileIntro';
import InfoSection from './elements/InfoSection';

export default function ProfileSection() {
	return (
		<View>
			<ProfileIntro />
			<InfoSection />
		</View>
	);
};

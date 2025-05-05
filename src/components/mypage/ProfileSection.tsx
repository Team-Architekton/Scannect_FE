import { Text, View } from 'react-native';
import Profile from './elements/Profile';
import InfoSection from './elements/InfoSection';

export default function ProfileIntro() {
	return (
		<View>
			<InfoSection />
			<Profile />
		</View>
	);
}

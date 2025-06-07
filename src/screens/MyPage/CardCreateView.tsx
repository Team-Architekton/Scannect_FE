import ScreenContainer from '../../components/ScreenContainer';
import CardCreateForm from '../../components/cardCreateUpdate/CardCreateForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function CardCreateView() {
	return (
		<ScreenContainer>
			<KeyboardAwareScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
				enableOnAndroid
				extraScrollHeight={100}
			>
				<CardCreateForm />
			</KeyboardAwareScrollView>
		</ScreenContainer>
	);
}

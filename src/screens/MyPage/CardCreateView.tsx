import ScreenContainer from '../../components/ScreenContainer';
import CardCreateForm from '../../components/cardCreateUpdate/CardCreateForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import spacing from '../../styles/spacing';

export default function CardCreateView() {
	return (
		<ScreenContainer>
			<KeyboardAwareScrollView
				contentContainerStyle={{ paddingBottom: spacing.s }}
				keyboardShouldPersistTaps="handled"
				extraScrollHeight={20}
				enableOnAndroid={true}
				showsVerticalScrollIndicator={false}
			>
				<CardCreateForm />
			</KeyboardAwareScrollView>
		</ScreenContainer>
	);
}

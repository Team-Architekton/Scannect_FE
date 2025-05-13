import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRef } from 'react';
import ScreenContainer from '../../components/ScreenContainer';
import CardCreateForm from '../../components/cardCRUD/CardCreateForm';

export default function CardCreateView() {
	const scrollRef = useRef<ScrollView>(null);

	const onFocus = () => {
		setTimeout(() => {
			scrollRef.current?.scrollToEnd({ animated: true });
		}, 300);
	};

	return (
		<ScreenContainer>
			<KeyboardAvoidingView
				behavior={Platform.select({ ios: 'padding', android: undefined })}
				keyboardVerticalOffset={80}
				style={{ flex: 1 }}
			>
				<ScrollView
					ref={scrollRef}
					contentContainerStyle={{ flexGrow: 1 }}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					<CardCreateForm onAnyInputFocus={onFocus} />
				</ScrollView>
			</KeyboardAvoidingView>
		</ScreenContainer>
	);
}

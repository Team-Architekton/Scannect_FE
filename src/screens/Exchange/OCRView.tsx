import { useRoute } from '@react-navigation/native';
import ScreenContainer from '../../components/ScreenContainer';
import CardSave from '../../components/ocr/CardSave';
import LoadingOverlay from '../../components/ocr/LoadingOverlay';
import { useOCR } from '../../hooks/useOCR';
import { useEffect, useRef } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function OCRView() {
	const route = useRoute<any>();
	const { imageUri } = route.params ?? {};
	const { loading, result, requestOCR } = useOCR();

	useEffect(() => {
		if (imageUri) {
			requestOCR(imageUri);
		}
	}, [imageUri]);

	return (
		<>
			{loading && <LoadingOverlay />}
			<ScreenContainer>
				<KeyboardAwareScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					enableOnAndroid
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
					extraScrollHeight={100}
				>
					{result && <CardSave initialData={result} />}
				</KeyboardAwareScrollView>
			</ScreenContainer>
		</>
	);
}

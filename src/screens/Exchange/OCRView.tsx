import { useRoute } from '@react-navigation/native';
import ScreenContainer from '../../components/ScreenContainer';
import CardSave from '../../components/ocr/CardSave';
import LoadingOverlay from '../../components/ocr/LoadingOverlay';
import { useOCR } from '../../hooks/useOCR';
import { useEffect, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CardForm } from '../../hooks/useCardForm';
import spacing from '../../styles/spacing';

export default function OCRView() {
	const route = useRoute<any>();
	const { imageUri } = route.params ?? {};
	const { loading, requestOCR } = useOCR();
	const [cardData, setCardData] = useState<Partial<CardForm> | null>(null);


	useEffect(() => {
		const fetchData = async () => {
			if (imageUri) {
				try {
					const data = await requestOCR(imageUri);
					setCardData(data as Partial<CardForm>);
				} catch (error) {
					console.error('OCR 실패:', error);
				}
			}
		};

		fetchData();
	}, [imageUri]);

	return (
		<>
			{loading && <LoadingOverlay />}
			<ScreenContainer>
				<KeyboardAwareScrollView
				contentContainerStyle={{ paddingBottom: spacing.s }}
				keyboardShouldPersistTaps="handled"
				extraScrollHeight={100}
				enableOnAndroid={true}
				showsVerticalScrollIndicator={false}
			>
					{cardData && <CardSave initialData={cardData} />}
				</KeyboardAwareScrollView>
			</ScreenContainer>
		</>
	);
};

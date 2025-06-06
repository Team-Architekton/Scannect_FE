import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import CardSave from '../../components/ocr/CardSave';
import LoadingOverlay from '../../components/ocr/LoadingOverlay';
import { useOCR } from '../../hooks/useOCR';
import { useEffect } from 'react';

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
				<View style={{ flex: 1 }}>{result && <CardSave initialData={result} />}</View>
			</ScreenContainer>
		</>
	);
};

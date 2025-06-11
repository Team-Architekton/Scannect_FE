import { getUserId } from '../utils/authStorage';
import { httpClient } from './http';

export const postOCR = async (imageUri: string) => {
    try {
        const formData = new FormData();
        formData.append('image', {
            uri: imageUri,
            name: 'photo.jpg',
            type: 'image/jpeg',
        } as any);

        const { data } = await httpClient.post('/ocr/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return data;
    } catch (error) {
        console.error('OCR POST 실패:', error);
        throw error;
    }
};

export const saveCard = async (cardData: any) => {
	const userId = await getUserId();

	try {
		const sanitizedCardData = {
			...cardData,
			cardName: cardData.cardName ?? '',
		};

		console.log('명함 데이터:', sanitizedCardData);
		console.log('사용자 ID:', userId);

		const { data } = await httpClient.post(
			`/card-list/save/ocr/${userId}`,
			sanitizedCardData
		);

		return data;
	} catch (error) {
		console.error('명함 저장 실패:', error);
		throw error;
	}
};



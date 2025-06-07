import { httpClient } from './http';

export const postOCR = async (imageUri: string) => {
    try {
        const formData = new FormData();
        formData.append('image', {
            uri: imageUri,
            name: 'photo.jpg',
            type: 'image/jpeg',
        } as any);

        const { data } = await httpClient.post('', formData, {
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


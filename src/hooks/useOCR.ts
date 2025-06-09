import { useState } from 'react';
import { postOCR, saveCard } from '../server/ocr';
import { CardForm } from './useCardForm';
import { useCardList } from './useCardList';

export const useOCR = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const { handleFetchCards } = useCardList();

	const requestOCR = async (imageUri: string) => {
		setLoading(true);
		setError(null);

		try {
			const data = await postOCR(imageUri);
			console.log(data);
			return data;
		} catch (err: any) {
			setError(err);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	// 	const requestOCR = async (imageUri: string) => {
	// 	setLoading(true);
	// 	setError(null);

	// 	try {
	// 		const data = await new Promise(resolve =>
	// 			setTimeout(() => {
	// 				resolve({"belongTo": null, "cardName": null, "companyTel": "+82 2 2285 5203", "content": null, "department": null, "email": "service@printrobo.co.kr", "industry": null, "job": "Project Manager", "nickname": null, "phoneNum": "+82 10 5185 5201", "position": null, "urlList": ["www.printrobo.co.kr"], "userId": "Jason Lee"});
	// 			}, 5000)
	// 		);
	// 		return data;
	// 	} catch (err: any) {
	// 		setError(err);
	// 		throw err;
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };

	const saveOCRCard = async (cardData: CardForm) => {
		try {
			const response = await saveCard(cardData);
			await handleFetchCards(false);
			return response;
		} catch (err: any) {
			setError(err);
			throw err;
		} 
	};

	return {
		loading,
		error,
		requestOCR,
		saveOCRCard,
	};
};

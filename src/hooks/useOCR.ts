import { useState } from 'react';
import { postOCR } from '../server/ocr';

export const useOCR = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [result, setResult] = useState<any>(null);

	// const requestOCR = async (imageUri: string) => {
	// 	setLoading(true);
	// 	setError(null);

	// 	try {
	// 		const data = await postOCR(imageUri);
	// 		setResult(data);
	// 		return data;
	// 	} catch (err: any) {
	// 		setError(err);
	// 		throw err;
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };

	const requestOCR = async (imageUri: string) => {
		setLoading(true);
		setError(null);

		try {
			const dummyResult = await new Promise(resolve =>
				setTimeout(() => {
					resolve({
						name: '홍길동',
						belongTo: '오픈AI 주식회사',
						phoneNum: '01012345678',
						email: 'honggildong@example.com',
					});
				}, 5000)
			);

			setResult(dummyResult);
			return dummyResult;
		} catch (err: any) {
			setError(err);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	return {
		result,
		loading,
		error,
		requestOCR,
	};
};

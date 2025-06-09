import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useRef } from 'react';

import { saveCard } from '../server/qrcode';
import { getUserId } from '../utils/authStorage';
import { useCardList } from './useCardList';

export function useQRCode() {
	const qrRef = useRef<any>(null);
	const scannedRef = useRef(false);
	const { handleFetchCards } = useCardList();

	/** qr코드 Base64 인코딩 후 파일 저장 및 외부로 공유하는 함수 */
	const shareQR = async () => {
		qrRef.current?.toDataURL(async (data: string) => {
			const filename = FileSystem.documentDirectory + 'scannect_qrcode.png';
			await FileSystem.writeAsStringAsync(filename, data, {
				encoding: FileSystem.EncodingType.Base64,
			});

			if (await Sharing.isAvailableAsync()) {
				await Sharing.shareAsync(filename);
			} else {
				console.error('qr 외부 공유 불가');
			}
		});
	};

	/** 바코드 스캔 상태 초기화 함수 */
	const resetScan = () => (scannedRef.current = false);

	/** 스캔한 명함 저장 함수 */
	const saveQRCard = async (cardId: number) => {
		try {
			const userId = await getUserId(); // id: tester, password: 123456
			if (!userId) throw new Error('로그인 정보 없음');

			/* 명함 저장 후 새로 불러오기 */
			await saveCard(userId, cardId);
			await handleFetchCards(false);
			return true;
		} catch (e) {
			console.error('명함 저장 실패', e);
			return false;
		}
	};

	/** 바코드 스캔 함수 */
	const scanQR = (data: string) => {
		if (scannedRef.current) return { dupScanned: true, validate: false };
		scannedRef.current = true;

		// qr코드 유효성 검사
		if (data.startsWith('scannect://')) return { dupScanned: false, validate: true };
		else return { dupScanned: false, validate: false };
	};

	return { qrRef, resetScan, shareQR, scanQR, saveQRCard };
}

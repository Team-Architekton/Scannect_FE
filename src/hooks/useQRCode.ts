import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useRef } from 'react';
import { Alert } from 'react-native';

export function useQRCode() {
	const qrRef = useRef<any>(null);
	const scannedRef = useRef(false);
	const navigation = useNavigation<any>();

	/** qr코드 Base64 인코딩 후 파일 저장 및 외부로 공유하는 함수 */
	const shareQR = async () => {
		console.log('qr 공유 중...');
		qrRef.current?.toDataURL(async (data: string) => {
			const filename = FileSystem.documentDirectory + 'scannect_qrcode.png';
			await FileSystem.writeAsStringAsync(filename, data, {
				encoding: FileSystem.EncodingType.Base64,
			});

			if (await Sharing.isAvailableAsync()) {
				await Sharing.shareAsync(filename);
			} else {
				alert('공유에 실패했습니다. 잠시 후 다시 시도해주세요.');
			}
		});
	};

	/** 바코드 스캔 상태 초기화 함수 */
	const resetScan = () => (scannedRef.current = false);

	/** 스캔한 명함을 저장하고 해당 명함 상세 페이지로 이동하는 함수 */
	const saveCard = (qrCardId: number) => {
		console.log(qrCardId, '저장 중...');
		/* 명함 저장 */
		/* 네비게이션 */
		navigation.pop();
		navigation.navigate('CardListTab', { screen: 'CardDetail', params: { cardId: qrCardId } });
	};

	/** 바코드 스캔 데이터 저장 함수 */
	const scanQR = (data: string) => {
		if (scannedRef.current) return;
		scannedRef.current = true;

		// qr코드 유효성 검사
		if (!data.startsWith('scannect://')) {
			Alert.alert('유효하지 않은 QR 코드입니다.', 'SCANNECT 명함 QR코드를 인식해주세요!', [
				{
					text: '확인',
					onPress: resetScan,
				},
			]);
		} else {
			// 링크 url에서 cardId 정보 get
			const parsedURL = data.split('/');
			const scannedCardId = parseInt(parsedURL[parsedURL.length - 1]);

			console.log(scannedRef.current, scannedCardId);

			Alert.alert(`명함 스캔 완료! id: ${scannedCardId}`, '스캔한 명함을 저장합니다...', [
				{
					text: '저장',
					onPress: () => saveCard(scannedCardId),
				},
				{ text: '취소', onPress: resetScan },
			]);
		}
	};

	return { qrRef, shareQR, scanQR };
}

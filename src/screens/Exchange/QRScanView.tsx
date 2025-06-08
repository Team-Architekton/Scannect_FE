import { Text, View, StyleSheet, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect } from 'react';

import { useQRCode } from '../../hooks/useQRCode';
import CommonButton from '../../components/CommonButton';

export default function QRScanView({ navigation }: any) {
	const { scanQR, resetScan, saveQRCard } = useQRCode();
	const [permission, requestPermission] = useCameraPermissions();

	const handleSaveQRCard = async (cardId: number) => {
		const success = await saveQRCard(cardId);
		if (!success) {
			Alert.alert('처리 실패', '잠시 후 다시 시도해주세요.');
			resetScan();
		} else {
			/* 네비게이션 */
			navigation.pop();
			navigation.navigate('CardListTab', { screen: 'CardDetail', params: { cardId } });
		}
	};

	const handleBarcodeScanned = ({ data }: { data: string }) => {
		const { dupScanned, validate } = scanQR(data);
		if (dupScanned) return;
		if (!validate) {
			Alert.alert('유효하지 않은 QR 코드입니다.', '정확한 명함 QR을 인식해주세요!', [
				{
					text: '확인',
					onPress: resetScan,
				},
			]);
		} else {
			// 링크 url에서 cardId 정보 get
			const paths = new URL(data).pathname.split('/');
			const scannedCardId = Number(paths.pop());

			Alert.alert('명함 스캔 완료!', '스캔한 명함을 저장합니다...', [
				{
					text: '저장',
					onPress: () => handleSaveQRCard(scannedCardId),
				},
				{ text: '취소', onPress: resetScan },
			]);
		}
	};

	useEffect(() => {
		if (!permission) {
			requestPermission();
		}
	}, []);

	if (!permission?.granted) {
		return (
			<View style={styles.container}>
				<Text>카메라 사용 권한이 필요합니다.</Text>
				<CommonButton title="권한 요청" onPress={requestPermission} />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<CameraView
				style={styles.scanner}
				onBarcodeScanned={handleBarcodeScanned}
				barcodeScannerSettings={{
					barcodeTypes: ['qr'],
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	scanner: {
		width: '100%',
		height: '100%',
	},
});

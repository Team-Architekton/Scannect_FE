import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useRef } from 'react';

export default function QRScanView({ navigation }: any) {
	const scannedRef = useRef(false);
	const [permission, requestPermission] = useCameraPermissions();

	/** 바코드 스캔 상태 초기화 함수 */
	const handleResetScan = () => (scannedRef.current = false);

	/** 스캔한 명함을 저장하고 해당 명함 상세 페이지로 이동하는 함수 */
	const handleSaveCard = (qrCardId: number) => {
		console.log(qrCardId, '저장 중...');
		/* 명함 저장 */
		/* 네비게이션 */
		navigation.navigate('CardListTab', { screen: 'CardDetail', params: { cardId: qrCardId } });
	};

	/** 바코드 스캔 데이터 저장 함수 */
	const handleBarcodeScan = ({ data }: { data: string }) => {
		if (scannedRef.current) return;
		scannedRef.current = true;

		if (!data.startsWith('scannect://')) {
			Alert.alert('유효하지 않은 QR 코드입니다.', 'SCANNECT 명함 QR코드를 인식해주세요!', [
				{
					text: '확인',
					onPress: handleResetScan,
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
					onPress: () => handleSaveCard(scannedCardId),
				},
				{ text: '취소', onPress: handleResetScan },
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
				<TouchableOpacity onPress={requestPermission}>
					<Text>권한 요청</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<CameraView
				style={styles.scanner}
				onBarcodeScanned={handleBarcodeScan}
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

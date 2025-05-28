import { Text, View, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect } from 'react';

import { useQRCode } from '../../hooks/useQRCode';
import CommonButton from '../../components/CommonButton';

export default function QRScanView() {
	const { scanQR } = useQRCode();
	const [permission, requestPermission] = useCameraPermissions();

	const handleBarcodeScanned = ({ data }: { data: string }) => {
		scanQR(data);
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

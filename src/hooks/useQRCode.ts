import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export function useQRCode() {
	const onQRShare = async (qrRef: React.RefObject<any>) => {
		// qr코드 BASE64 인코딩 후 파일 공유
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
	return { onQRShare };
}

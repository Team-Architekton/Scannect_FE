import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const takePhoto = async (): Promise<string | null> => {
	const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

	if (!permissionResult.granted) {
		Alert.alert('권한이 필요합니다', '카메라 접근 권한을 허용해주세요.');
		return null;
	}

	const result = await ImagePicker.launchCameraAsync({
		allowsEditing: true,
		aspect: [4, 3],
		quality: 0.7,
		base64: false,
	});

	if (result.canceled || result.assets.length === 0) {
		return null;
	}

	return result.assets[0].uri;
};

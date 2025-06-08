import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const pickImage = async (): Promise<string | null> => {
	const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

	if (!permissionResult.granted) {
		Alert.alert('권한이 필요합니다', '갤러리 접근 권한을 허용해주세요.');
		return null;
	}

	const result = await ImagePicker.launchImageLibraryAsync({
		allowsEditing: true,
		aspect: [4, 3] as [number, number],
		quality: 0.7,
		base64: false,
	});

	if (result.canceled || result.assets.length === 0) {
		return null;
	}

	return result.assets[0].uri;
};

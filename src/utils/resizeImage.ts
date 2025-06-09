import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

const MAX_SIZE_KB = 500;
const INITIAL_WIDTH = 1000;
const MIN_WIDTH = 300;
const INITIAL_QUALITY = 0.8;
const MIN_QUALITY = 0.4;

export async function resizeImage(uri: string): Promise<string> {
	let fileInfo = await FileSystem.getInfoAsync(uri);
	if (!fileInfo.exists || typeof fileInfo.size !== 'number') {
		throw new Error('Image file not found or size unknown.');
	}

	let sizeKB = fileInfo.size / 1024;
	if (sizeKB <= MAX_SIZE_KB) {
		return uri;
	}

	let width = INITIAL_WIDTH;

	while (width >= MIN_WIDTH) {
		const result = await ImageManipulator.manipulateAsync(
			uri,
			[{ resize: { width } }],
			{ compress: INITIAL_QUALITY, format: ImageManipulator.SaveFormat.JPEG }
		);

		const resizedInfo = await FileSystem.getInfoAsync(result.uri);
		if (!resizedInfo.exists || typeof resizedInfo.size !== 'number') {
			throw new Error('Resized image file info not available.');
		}

		sizeKB = resizedInfo.size / 1024;

		if (sizeKB <= MAX_SIZE_KB) {
			return result.uri;
		}

		width = Math.floor(width * 0.9);
	}

	let quality = INITIAL_QUALITY;
	while (quality >= MIN_QUALITY) {
		const result = await ImageManipulator.manipulateAsync(
			uri,
			[{ resize: { width: MIN_WIDTH } }],
			{ compress: quality, format: ImageManipulator.SaveFormat.JPEG }
		);

		const resizedInfo = await FileSystem.getInfoAsync(result.uri);
		if (!resizedInfo.exists || typeof resizedInfo.size !== 'number') {
			throw new Error('Compressed image file info not available.');
		}

		sizeKB = resizedInfo.size / 1024;

		if (sizeKB <= MAX_SIZE_KB) {
			return result.uri;
		}

		quality -= 0.1;
	}

	return uri;
};

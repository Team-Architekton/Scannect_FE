import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../styles/Colors';
import spacing from '../../styles/spacing';
import { AntDesign } from '@expo/vector-icons';

interface Props {
	imageUri: string | null;
	onChange: (uri: string | null) => void;
}

export default function ProfileImagePicker({ imageUri, onChange }: Props) {
	const pickImage = async () => {
		const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!permissionResult.granted) {
			alert('갤러리 접근 권한이 필요합니다');
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.7,
			selectionLimit: 1,
		});

		if (!result.canceled) {
			onChange(result.assets[0].uri);
		}
	};

	const handlePress = () => {
		if (imageUri) {
			Alert.alert(
				'프로필 이미지',
				'이미지를 어떻게 하시겠습니까?',
				[
					{ text: '삭제', style: 'destructive', onPress: () => onChange(null) },
					{ text: '변경', onPress: pickImage },
					{ text: '취소', style: 'cancel' },
				],
				{
					cancelable: true,
					onDismiss: () => {},
				}
			);
		} else {
			pickImage();
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.imageContainer} onPress={handlePress}>
				{imageUri ? (
					<Image source={{ uri: imageUri }} style={styles.image} />
				) : (
					<View style={styles.placeholder}>
						<AntDesign name="plus" size={24} color={colors.grayscaleGray3} />
						<Text style={styles.placeholderText}>이미지 추가</Text>
					</View>
				)}
			</TouchableOpacity>
		</View>
	);
}

const IMAGE_SIZE = 96;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginBottom: spacing.l,
	},
	imageContainer: {
		width: IMAGE_SIZE,
		height: IMAGE_SIZE,
		borderRadius: IMAGE_SIZE / 2,
		overflow: 'hidden',
		backgroundColor: colors.grayscaleGray1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: IMAGE_SIZE,
		height: IMAGE_SIZE,
		resizeMode: 'cover',
	},
	placeholder: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	placeholderText: {
		color: colors.grayscaleGray3,
		fontSize: 12,
		marginTop: 4,
	},
});

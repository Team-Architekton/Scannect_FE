import React from 'react';
import { Modal, Pressable, View, StyleSheet, Text } from 'react-native';
import CommonButton from '../CommonButton';
import spacing from '../../styles/spacing';
import colors from '../../styles/Colors';
import typography from '../../styles/typography';
import { pickImage } from '../../utils/pickImage';
import { takePhoto } from '../../utils/takePhoto';

interface Props {
	visible: boolean;
	onClose: () => void;
	onSelect: (source: 'camera' | 'gallery', imageUri?: string) => void;
}

export default function OCRImageSourceModal({ visible, onClose, onSelect }: Props) {
	const handleGallery = async () => {
		const uri = await pickImage();
		if (uri) {
			onSelect('gallery', uri);
			onClose();
		}
	};

	const handleCamera = async () => {
		const uri = await takePhoto();
		if (uri) {
			onSelect('camera', uri);
			onClose();
		}
	};

	return (
		<Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
			<Pressable style={styles.backdrop} onPress={onClose}>
				<View style={styles.modalContent}>
					<Text style={[typography.bodyBold, styles.title]}>
						종이명함을 가져올 방법을 선택하세요
					</Text>
					<CommonButton
						title="카메라 촬영"
						onPress={handleCamera}
						size="medium"
						buttonStyle={{ marginBottom: spacing.s }}
					/>
					<CommonButton title="앨범 선택" onPress={handleGallery} size="medium" />
				</View>
			</Pressable>
		</Modal>
	);
}

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
	},
	modalContent: {
		width: 300,
		backgroundColor: colors.grayscaleGray1,
		borderRadius: 12,
		padding: spacing.l,
		alignItems: 'center',
	},
	title: {
		marginBottom: spacing.l,
	},
});

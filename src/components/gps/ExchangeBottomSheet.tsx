import { Modal, Pressable, View, Text, StyleSheet } from 'react-native';
import CommonButton from '../CommonButton';
import spacing from '../../styles/spacing';
import colors from '../../styles/Colors';
import typography from '../../styles/typography';

interface Props {
	visible: boolean;
	onClose: () => void;
	onSelect: (type: 'QRGenerate' | 'QRScan' | 'PaperScan') => void;
}

export default function ExchangeBottomSheet({ visible, onClose, onSelect }: Props) {
	return (
		<Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
			<View style={styles.backdrop}>
				<Pressable style={styles.backdropPress} onPress={onClose} />
				<View style={styles.sheet}>
					<View style={styles.header}>
						<Text style={typography.bodyBold}>다른 방법으로 교환</Text>
						<Pressable onPress={onClose}>
							<Text style={typography.bodyBold}>✕</Text>
						</Pressable>
					</View>

					<CommonButton
						title="QR 코드 생성"
						onPress={() => onSelect('QRGenerate')}
						buttonStyle={{ marginBottom: spacing.m }}
						size="large"
					/>
					<CommonButton
						title="QR 코드 스캔"
						onPress={() => onSelect('QRScan')}
						buttonStyle={{ marginBottom: spacing.m }}
						size="large"
					/>
					<CommonButton
						title="종이 명함 스캔"
						onPress={() => onSelect('PaperScan')}
						buttonStyle={{ marginBottom: spacing.m }}
						size="large"
					/>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	backdropPress: {
		flex: 1,
	},
	sheet: {
		backgroundColor: colors.grayscaleGray1,
		padding: spacing.l,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: spacing.xxl,
	},
});

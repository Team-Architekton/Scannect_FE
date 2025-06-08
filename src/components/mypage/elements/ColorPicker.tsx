import React from 'react';
import {
	View,
	TouchableOpacity,
	Modal,
	StyleSheet,
	TouchableWithoutFeedback,
	Pressable,
} from 'react-native';
import { CARD_COLORS } from '../../../constants/cardColors';

type Props = {
	visible: boolean;
	onSelect: (colour: string) => void;
	onClose: () => void;
};

const ColorPickerModal: React.FC<Props> = ({ visible, onSelect, onClose }) => {
	return (
		<Modal visible={visible} transparent animationType="slide">
			<Pressable style={styles.overlay} onPress={onClose}>
				<TouchableWithoutFeedback>
					<View style={styles.sheet}>
						<View style={styles.colorGrid}>
							{CARD_COLORS.map(colour => (
								<TouchableOpacity
									key={colour}
									style={[styles.colorCircle, { backgroundColor: colour }]}
									onPress={() => {
										onSelect(colour);
										onClose();
									}}
								/>
							))}
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Pressable>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: 'flex-end',
		backgroundColor: 'rgba(0,0,0,0.3)',
	},
	sheet: {
		backgroundColor: '#fff',
		padding: 20,
		borderTopRightRadius: 16,
		borderTopLeftRadius: 16,
	},
	colorGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
		justifyContent: 'center',
	},
	colorCircle: {
		width: 36,
		height: 36,
		borderRadius: 18,
		margin: 6,
		borderWidth: 1,
		borderColor: '#ccc',
	},
});

export default ColorPickerModal;

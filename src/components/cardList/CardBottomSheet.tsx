import { Modal, Pressable, StyleSheet, View } from 'react-native';

import CommonButton from '../CommonButton';
import colors from '../../styles/Colors';
import { useCardStore } from '../../store/cardStore';
import { useModalStore } from '../../store/modalStore';
import { useCardModal } from '../../hooks/useCardModal';
import spacing from '../../styles/spacing';

export default function CardBottomSheet() {
	const { isModalOpen, selectedCardId, closeModal } = useModalStore();
	const selectedCard = useCardStore(state => state.cardList.find(c => c.cardId === selectedCardId));
	const { onHideCard, onDeleteCard } = useCardModal();

	if (!isModalOpen || !selectedCard) return null;

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={isModalOpen}
			onRequestClose={closeModal}
		>
			<View style={styles.overlay}>
				<Pressable style={styles.overlayPress} onPress={closeModal} />
				<View style={styles.modalView}>
					<CommonButton
						title={
							selectedCard !== undefined && !selectedCard.isActive
								? '명함 숨김 해제하기'
								: '명함 리스트에서 숨김'
						}
						onPress={() => onHideCard(selectedCard.id, 'isActive', !selectedCard.isActive)}
						buttonStyle={{ width: '85%', marginBottom: spacing.s }}
						size="large"
					/>
					<CommonButton
						title="명함 리스트에서 삭제"
						onPress={() => onDeleteCard(selectedCard.id)}
						buttonStyle={{ width: '85%', backgroundColor: colors.darkGreen }}
						size="large"
					/>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	overlayPress: {
		flex: 1,
	},
	modalView: {
		width: '100%',
		backgroundColor: 'white',
		borderRadius: spacing.ml,
		alignItems: 'center',
		paddingVertical: spacing.xxl,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
});

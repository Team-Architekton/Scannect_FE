import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

import CommonButton from '../../CommonButton';
import colors from '../../../styles/Colors';
import { useCardStore } from '../../../store/cardStore';
import { useModalStore } from '../../../store/modalStore';
import { useCardModal } from '../../../hooks/useCardModal';

export default function CardBottomSheet() {
	const { isModalOpen, selectedCardId, closeModal } = useModalStore();
	const selectedCard = useCardStore(state => state.cardList.find(c => c.id === selectedCardId));
	const { onHideCard, onDeleteCard } = useCardModal();

	if (!isModalOpen || !selectedCard) return null;

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={isModalOpen}
			onRequestClose={closeModal}
		>
			<View
				style={{
					flex: 1,
					justifyContent: 'flex-end',
				}}
			>
				<View style={styles.modalView}>
					<TouchableOpacity
						style={{ width: '100%', alignItems: 'flex-end', paddingHorizontal: 10 }}
						onPress={closeModal}
					>
						<Entypo name="cross" size={30} color={colors.darkGreen} />
					</TouchableOpacity>
					<View style={styles.buttonWrapper}>
						<CommonButton
							title={
								selectedCard !== undefined && !selectedCard.isActive
									? '명함 숨김 해제하기'
									: '명함 리스트에서 숨김'
							}
							onPress={() => onHideCard(selectedCardId, !selectedCard.isActive)}
							buttonStyle={styles.button}
							textStyle={styles.textStyle}
							size="large"
						/>
						<CommonButton
							title="명함 리스트에서 삭제"
							onPress={() => onDeleteCard(selectedCardId)}
							buttonStyle={{ ...styles.button, backgroundColor: colors.darkGreen }}
							textStyle={styles.textStyle}
							size="large"
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalView: {
		width: '100%',
		backgroundColor: 'white',
		borderRadius: 20,
		alignItems: 'center',
		paddingVertical: 15,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	buttonWrapper: {
		width: '100%',
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 30,
	},
	button: {
		width: '85%',
		paddingVertical: 18,
		marginBottom: 7,
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 18,
	},
});

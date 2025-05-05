import { Alert, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

import CommonButton from './../CommonButton';
import colors from '../../styles/Colors';
import { useCardStore } from '../../store/cardStore';
import { useModalStore } from '../../store/modalStore';

export default function CardBottomSheet() {
	const { cardList, hideCard, deleteCard } = useCardStore();
	const { isModalOpen, selectedCardId, closeModal } = useModalStore();

	const [selectedCard] = cardList.filter(card => card.id === selectedCardId);

	const handleHidingCard = (cardId: number | null) => {
		if (cardId === null) return;
		try {
			const newStatus = !selectedCard.status;
			if (!newStatus) {
				// 명함을 숨기는 경우
				Alert.alert('선택한 명함을 숨김 처리합니다.', '정말 숨기시겠습니까?', [
					{
						text: '확인',
						onPress: () => {
							hideCard(cardId, newStatus);
							Alert.alert('명함이 숨김 처리되었습니다');
						},
					},
					{ text: '취소' },
				]);
			} else {
				// 명함을 숨김 해제하는 경우
				hideCard(cardId, newStatus);
				Alert.alert('명함 숨김이 해제되었습니다');
			}
		} catch {
			Alert.alert('처리에 실패했습니다. 잠시 후 다시 시도해주세요.');
		}
		closeModal();
	};
	const handleDeletingCard = (cardId: number | null) => {
		if (cardId === null) return;
		try {
			Alert.alert('선택한 명함을 삭제합니다.', '정말 삭제하시겠습니까?', [
				{
					text: '확인',
					onPress: () => {
						deleteCard(cardId);
						Alert.alert('명함이 삭제되었습니다.');
					},
				},
				{ text: '취소' },
			]);
		} catch {
			Alert.alert('처리에 실패했습니다. 잠시 후 다시 시도해주세요.');
		}
		closeModal();
	};
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
								selectedCard !== undefined && !selectedCard.status
									? '명함 숨김 해제하기'
									: '명함 리스트에서 숨김'
							}
							onPress={() => handleHidingCard(selectedCardId)}
							buttonStyle={styles.button}
							textStyle={styles.textStyle}
							size="large"
						/>
						<CommonButton
							title="명함 리스트에서 삭제"
							onPress={() => handleDeletingCard(selectedCardId)}
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

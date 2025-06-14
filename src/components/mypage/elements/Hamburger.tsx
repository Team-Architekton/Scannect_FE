import React, { useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Alert,
	TouchableWithoutFeedback,
} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useMypage } from '../../../hooks/useMypage';
import ColorPickerModal from './ColorPicker';
import colors from '../../../styles/Colors';
import { useUiStore } from '../../../store/useUiStore';
import { useMypageStore } from '../../../store/useMyPageStore';

const Hamburger = () => {
	const [showColorPicker, setShowColorPicker] = useState(false);
	const selectedCard = useMypageStore(state => state.selectedCard);
	const { setDefaultCard, deleteCard, updateCard } = useMypage();
	const { hamburgerOpen: visible, setHamburgerOpen: setVisible } = useUiStore();
	const { setIsEditing } = useMypageStore();

	const handleAction = (action: string) => {
		setVisible(false);

		switch (action) {
			case '명함 색상 지정':
				setShowColorPicker(true);
				break;

			case '기본 명함 지정':
				Alert.alert('기본 명함 지정', '해당 명함을 기본 명함으로 지정하시겠습니까?', [
					{ text: '취소' },
					{ text: '지정', onPress: () => setDefaultCard(selectedCard!.id) },
				]);
				break;

			case '수정':
				Alert.alert('명함 수정', '수정하시겠습니까?', [
					{ text: '취소' },
					{ text: '확인', onPress: () => setIsEditing(true) },
				]);
				break;

			case '삭제':
				Alert.alert('명함 삭제', '삭제하시겠습니까?', [
					{ text: '취소' },
					{ text: '삭제', onPress: () => deleteCard(selectedCard!.id) },
				]);
				break;
		}
	};

	const menuItems = [
		'명함 색상 지정',
		...(selectedCard?.isMain ? ['수정', '삭제'] : ['기본 명함 지정', '수정', '삭제']),
	];

	return (
		<>
			<View style={styles.container}>
				<TouchableOpacity onPress={() => setVisible(true)}>
					<Entypo name="menu" size={24} color="black" />
				</TouchableOpacity>

				{visible && (
					<>
						<TouchableWithoutFeedback onPress={() => setVisible(false)}>
							<View style={styles.overlay} />
						</TouchableWithoutFeedback>
						<View style={styles.dropdownWrapper}>
							<View style={styles.dropdown}>
								{menuItems.map(item => (
									<TouchableOpacity
										key={item}
										style={styles.item}
										onPress={() => handleAction(item)}
									>
										<Text>{item}</Text>
									</TouchableOpacity>
								))}
							</View>
						</View>
					</>
				)}
			</View>

			<ColorPickerModal
				visible={showColorPicker}
				onSelect={colour =>
					updateCard(selectedCard!.id, {
						...selectedCard,
						colour,
					})
				}
				onClose={() => setShowColorPicker(false)}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'relative',
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 9,
	},
	dropdownWrapper: {
		position: 'absolute',
		top: 25,
		right: 0,
		zIndex: 10,
	},
	dropdown: {
		backgroundColor: colors.white,
		borderRadius: 10,
		borderColor: colors.grayscaleGray2,
		borderWidth: 1,
		width: 160,
		elevation: 3,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	item: {
		padding: 12,
		borderBottomWidth: 1,
		borderBottomColor: colors.grayscaleGray1,
	},
});

export default Hamburger;

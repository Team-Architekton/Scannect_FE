import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useMypageStore } from '../../../store/useMyPageStore';
import { Card } from '../../../model/card';
import spacing from '../../../styles/spacing';
import colors from '../../../styles/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useUiStore } from '../../../store/useUiStore';
import { useEffect } from 'react';


type Props = {
	showCreateOption?: boolean;
};

const DropdownMenu: React.FC<Props> = ({ showCreateOption = true }) => {
	const { cards, selectedCard, setSelectedCardId } = useMypageStore();
	const { dropdownOpen: open, setDropdownOpen: setOpen } = useUiStore();
	const navigation = useNavigation<any>();

	const sortedCards = [...cards].sort((a, b) => (a.isMain === b.isMain ? 0 : a.isMain ? -1 : 1));

	const handleSelect = (card: Card | 'new') => {
		setOpen(false);
		if (card === 'new') {
			navigation.navigate('명함 생성');
		} else {
			setSelectedCardId(card.id);
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.dropdownHeader} onPress={() => setOpen(!open)}>
				<Text>{selectedCard?.cardName ?? '명함 선택'}</Text>
				<AntDesign name="caretdown" size={12} color="black" />
			</TouchableOpacity>

			{open && (
				<>
					<TouchableOpacity
						style={styles.overlay}
						onPress={() => setOpen(false)}
						activeOpacity={1}
					/>
					<View style={styles.dropdownList}>
						{sortedCards.map(card => (
							<TouchableOpacity
								key={card.id}
								style={styles.dropdownItem}
								onPress={() => handleSelect(card)}
							>
								<View style={styles.cardRow}>
									<Text>{card.cardName}</Text>
									{card.isMain && <Text style={styles.defaultBadge}>기본</Text>}
								</View>
							</TouchableOpacity>
						))}

						{showCreateOption && (
							<>
								<View style={styles.divider} />
								<TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelect('new')}>
									<Text style={styles.createCardText}>+ 새로운 명함 생성</Text>
								</TouchableOpacity>
							</>
						)}
					</View>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'flex-start',
		position: 'relative',
	},
	dropdownHeader: {
		padding: spacing.s,
		backgroundColor: colors.white,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: colors.grayscaleGray2,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 9,
	},
	dropdownList: {
		position: 'absolute',
		top: 40,
		left: 0,
		zIndex: 10,
		width: 180,
		borderRadius: 8,
		backgroundColor: colors.white,
		borderWidth: 1,
		borderColor: colors.grayscaleGray2,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 4,
		elevation: 4,
	},
	dropdownItem: {
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
	cardRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	defaultBadge: {
		fontSize: 10,
		color: colors.primary,
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 6,
		backgroundColor: colors.grayscaleGray1,
		marginLeft: 8,
	},
	createCardText: {
		color: colors.primary,
		fontWeight: 'bold',
	},
	divider: {
		height: 1,
		backgroundColor: colors.grayscaleGray2,
		marginVertical: 4,
	},
});

export default DropdownMenu;

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useMypage } from '../../../hooks/useMypage';
import { useMypageStore } from '../../../store/myPageStore';
import { Card } from '../../../model/card';
import spacing from '../../../styles/spacing';
import colors from '../../../styles/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';

const DropdownMenu: React.FC = () => {
	const { selectedCard, setSelectedCard } = useMypageStore();
	const { cards } = useMypage();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!selectedCard && cards.length > 0) {
			setSelectedCard(cards.find(c => c.isDefault) ?? cards[0]);
		}
	}, [cards, selectedCard]);

	const handleSelect = (card: Card | 'new') => {
		setOpen(false);
		if (card === 'new') {
			console.log('명함 생성 뷰로 이동!');
			// navigation.navigate('CardCreate');
		} else {
			setSelectedCard(card);
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.dropdownHeader} onPress={() => setOpen(!open)}>
				<Text>{selectedCard?.title ?? '명함 선택'}</Text>
				<AntDesign name="caretdown" size={12} color="black" />
			</TouchableOpacity>

			{open && (
				<View style={styles.dropdownList}>
					{cards.map(card => (
						<TouchableOpacity
							key={card.id}
							style={styles.dropdownItem}
							onPress={() => handleSelect(card)}
						>
							<Text>{card.title}</Text>
						</TouchableOpacity>
					))}
					<View style={styles.divider} />
					<TouchableOpacity
						style={styles.dropdownItem}
						onPress={() => handleSelect('new')}
					>
						<Text style={styles.createCardText}>새로운 명함 생성</Text>
					</TouchableOpacity>
				</View>
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
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.m,
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
	dropdownList: {
		position: 'absolute',
		top: 50,
		left: 0,
		zIndex: 10,
		width: 160,
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

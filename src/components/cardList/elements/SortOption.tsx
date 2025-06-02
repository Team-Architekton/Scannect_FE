import { TouchableOpacity, View, Text, LayoutAnimation, StyleSheet } from 'react-native';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useCardStore } from '../../../store/cardStore';
import colors from '../../../styles/Colors';
import commonStyles from '../../../styles/commonStyles';
import spacing from '../../../styles/spacing';

export default function SortOption() {
	const { sortOption, sortCardList } = useCardStore();
	const [dropDownShow, setDropDownShow] = useState(false);

	const toggleDropDown = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setDropDownShow(prev => !prev);
	};
	const sortByOption = (option: 'latest' | 'name') => {
		sortCardList(option);
		toggleDropDown();
	};
	return (
		<View>
			<TouchableOpacity onPress={toggleDropDown}>
				<Ionicons name="menu" size={30} color={colors.darkGreen} />
			</TouchableOpacity>
			{dropDownShow && (
				<View style={styles.dropdownView}>
					<TouchableOpacity
						style={{
							...styles.dropdownItem,
							...styles.dropdownItemTop,
							backgroundColor: sortOption === 'latest' ? colors.lightGreen : undefined,
						}}
						onPress={() => sortByOption('latest')}
					>
						<Text style={styles.dropdownText}>최신순</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							...styles.dropdownItem,
							...styles.dropdownItemBottom,
							backgroundColor: sortOption === 'name' ? colors.lightGreen : undefined,
						}}
						onPress={() => sortByOption('name')}
					>
						<Text style={styles.dropdownText}>가나다순</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	dropdownView: {
		position: 'absolute',
		zIndex: 99,
		top: 30,
		right: 0,
		width: 80,
		borderRadius: spacing.xs,
		backgroundColor: colors.primary,
	},
	dropdownItem: {
		paddingVertical: spacing.xs,
		paddingHorizontal: spacing.sm,
	},
	dropdownItemTop: {
		borderTopLeftRadius: spacing.xs,
		borderTopRightRadius: spacing.xs,
	},
	dropdownItemBottom: {
		borderBottomLeftRadius: spacing.xs,
		borderBottomRightRadius: spacing.xs,
	},
	dropdownText: {
		...commonStyles.bodyText,
		color: colors.white,
	},
});

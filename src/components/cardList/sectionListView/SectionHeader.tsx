import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import colors from '../../../styles/Colors';

interface ISectionHeaderProps {
	sectionKey: string;
	title: string;
	length: number;
	isArcodianOpen?: boolean;
	onToggle: (sectionKey: string) => void;
}

export default function SectionHeader({
	sectionKey,
	title,
	length,
	isArcodianOpen,
	onToggle,
}: ISectionHeaderProps) {
	if (sectionKey === 'common') {
		return (
			<View style={styles.cardListLabel}>
				<Text>
					{title} ({length}){' '}
				</Text>
			</View>
		);
	}
	return (
		<TouchableOpacity onPress={() => onToggle(sectionKey)} style={styles.cardListLabel}>
			<Text>
				{title} ({length}){' '}
			</Text>
			<Ionicons
				name={isArcodianOpen ? 'chevron-up' : 'chevron-down'}
				size={16}
				color={colors.grayscaleGray5}
			/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	cardListLabel: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 7,
	},
});

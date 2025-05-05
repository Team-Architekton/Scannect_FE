import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useGPSStore } from '../../store/gpsStore';
import { IGpsUser } from '../../model/gpsUser';
import colors from '../../styles/Colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

export default function GPSUserItem({ user }: { user: IGpsUser }) {
	const { selectedUserIds, toggleSelectUser } = useGPSStore();
	const isSelected = selectedUserIds.includes(user.id);

	return (
		<Pressable
			onPress={() => toggleSelectUser(user.id)}
			style={[styles.item, isSelected && styles.selected]}
		>
			<View />
			<View>
				<Text style={typography.bodyBold}>{user.name}</Text>
				<Text style={typography.caption}>
					{user.job} / {user.company}
				</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: spacing.m,
		borderRadius: 10,
		backgroundColor: colors.grayscaleGray1,
		marginVertical: spacing.xs,
	},
	selected: {
		backgroundColor: colors.primary,
	},
});

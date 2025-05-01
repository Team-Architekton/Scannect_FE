import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useGPSStore } from '../../store/gpsStore';
import { IGpsUser } from '../../model/gpsUser';
import colors from '../../styles/Colors';

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
				<Text style={styles.name}>{user.name}</Text>
				<Text style={styles.detail}>
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
		padding: 16,
		borderRadius: 10,
		backgroundColor: colors.grayscaleGray1,
		marginVertical: 5,
	},
	selected: {
		backgroundColor: colors.primary,
	},
	name: { fontSize: 16, fontWeight: 'bold' },
	detail: { fontSize: 12, color: '#555' },
});

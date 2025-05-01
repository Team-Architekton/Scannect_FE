import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useGPSStore } from '../../store/gpsStore';
import { IGpsUser } from '../../model/gpsUser';

export default function GPSUserItem({ user }: { user: IGpsUser }) {
	const { selectedUserId, selectUser } = useGPSStore();
	const isSelected = selectedUserId === user.id;

	return (
		<Pressable
			onPress={() => selectUser(user.id)}
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
		backgroundColor: '#f2f2f2',
		marginVertical: 5,
	},
	selected: {
		backgroundColor: '#c1eaff',
	},
	name: { fontSize: 16, fontWeight: 'bold' },
	detail: { fontSize: 12, color: '#555' },
});

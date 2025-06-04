import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import colors from '../../../styles/Colors';
import typography from '../../../styles/typography';
import { ICardItem } from '../../../model/cardItem';
import { useModalStore } from '../../../store/modalStore';
import { CardListStackParamList } from '../../../navigations/types';
import HeartIcon from '../elements/HeartIcon';
import spacing from '../../../styles/spacing';

export default function CardItem(props: ICardItem) {
	const navigation = useNavigation<NativeStackNavigationProp<CardListStackParamList>>();
	const { isModalOpen, selectedCardId, openModal } = useModalStore();

	return (
		<Pressable
			onLongPress={() => openModal(props.id)}
			onPress={() => navigation.navigate('CardDetail', { cardId: props.id })}
			style={({ pressed }) => [
				styles.cardItem,
				{
					backgroundColor:
						pressed || (isModalOpen && selectedCardId === props.id)
							? colors.paleDarkGreen
							: colors.paleGreen,
				},
			]}
		>
			<HeartIcon cardId={props.id} isFavorite={props.favorite} />
			<View style={{ width: '75%' }}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Text style={styles.cardItemName}>{props.name}</Text>
					<Text style={{ ...styles.cardItemSubInfo, marginLeft: 7 }}>
						{props.belongTo} | {props.department} / {props.job}
					</Text>
				</View>
				{props.memo ? (
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={{ ...styles.cardItemSubInfo, marginTop: 3 }}
					>
						{props.memo}
					</Text>
				) : null}
			</View>
			<Ionicons name="chevron-forward" size={30} color={colors.darkGreen} />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	cardItem: {
		height: 80,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: colors.paleGreen,
		borderRadius: spacing.m,
		padding: spacing.m,
		marginVertical: spacing.xs,
	},
	cardItemName: {
		...typography.h3,
	},
	cardItemSubInfo: {
		color: colors.grayscaleGray7,
	},
	heartButton: {
		paddingRight: spacing.xs,
	},
});

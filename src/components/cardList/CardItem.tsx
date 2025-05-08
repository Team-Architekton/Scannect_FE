import { Text, View, StyleSheet, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import colors from '../../styles/Colors';
import typography from '../../styles/typography';
import { ICardItem } from '../../model/cardItem';
import { useModalStore } from '../../store/modalStore';
import { StackParamList } from '../../navigations/CardListStack';

export default function CardItem(props: ICardItem) {
	const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
	const { isModalOpen, selectedCardId, openModal } = useModalStore();
	const [isImportant, setIsImportant] = useState(props.favorite);
	const toggleHeart = () => {
		setIsImportant(prev => {
			Alert.alert(!prev ? '중요 인맥으로 설정되었습니다.' : '중요 인맥에서 해제되었습니다.');
			return !prev;
		});
	};

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
			<Pressable onPress={toggleHeart} style={styles.heartButton}>
				{isImportant ? (
					<AntDesign name="heart" size={30} color={colors.primary} />
				) : (
					<AntDesign name="hearto" size={30} color={colors.darkGreen} />
				)}
			</Pressable>
			<View style={{ width: '75%' }}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Text style={styles.cardItemName}>{props.name}</Text>
					<Text style={{ ...styles.cardItemSubInfo, marginLeft: 7 }}>
						{props.belong_to} | {props.department} / {props.job}
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
		borderRadius: 15,
		padding: 15,
		marginVertical: 5,
	},
	cardItemName: {
		...typography.h3,
	},
	cardItemSubInfo: {
		color: colors.grayscaleGray7,
	},
	heartButton: {
		paddingRight: 5,
	},
});

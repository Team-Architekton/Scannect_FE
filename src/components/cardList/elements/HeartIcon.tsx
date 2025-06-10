import { Alert, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import colors from '../../../styles/Colors';
import spacing from '../../../styles/spacing';
import { useCardList } from '../../../hooks/useCardList';

interface IHeartProp {
	id: number;
	favorite: boolean;
	size?: number;
}

export default function HeartIcon({ id, favorite, size = 20 }: IHeartProp) {
	const { handleEditCard } = useCardList();
	const toggleHeart = async () => {
		const newStatus = !favorite;
		const success = await handleEditCard(id, 'favorite', newStatus);
		if (success) {
			Alert.alert(newStatus ? '중요 인맥으로 설정되었습니다.' : '중요 인맥에서 해제되었습니다.');
		} else Alert.alert('처리 실패', '잠시 후 다시 시도해주세요.');
	};
	return (
		<Pressable hitSlop={spacing.sm} onPress={toggleHeart}>
			{favorite ? (
				<AntDesign name="heart" size={size} color={colors.primary} />
			) : (
				<AntDesign name="hearto" size={size} color={colors.darkGreen} />
			)}
		</Pressable>
	);
}

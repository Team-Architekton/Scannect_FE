import { RouteProp, useRoute } from '@react-navigation/native';
import { Text } from 'react-native';

import { StackParamList } from '../../navigations/CardListStack';

type CardDetailRouteProp = RouteProp<StackParamList, 'CardDetail'>;

export default function CardDetailView() {
	const route = useRoute<CardDetailRouteProp>();
	const { cardId } = route.params;
	return <Text>명함 상세 {cardId}</Text>;
}

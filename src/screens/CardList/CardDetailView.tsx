import { RouteProp, useRoute } from '@react-navigation/native';
import { Text } from 'react-native';

import ScreenContainer from '../../components/ScreenContainer';
import { CardListStackParamList } from '../../navigations/types';

type CardDetailRouteProp = RouteProp<CardListStackParamList, '명함 상세'>;

export default function CardDetailView() {
	const route = useRoute<CardDetailRouteProp>();
	const { cardId } = route.params;
	return (
		<ScreenContainer>
			<Text>명함 상세 {cardId}</Text>
		</ScreenContainer>
	);
}

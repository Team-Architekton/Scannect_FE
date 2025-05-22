import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CardDetailView from '../screens/CardList/CardDetailView';
import CardListView from '../screens/CardList/CardListView';
import { CardListStackParamList } from './types';

const Stack = createNativeStackNavigator<CardListStackParamList>();

export default function CardListStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="CardList" component={CardListView} options={{ title: '명함 리스트' }} />
			<Stack.Screen name="CardDetail" component={CardDetailView} options={{ title: '명함 상세' }} />
		</Stack.Navigator>
	);
}

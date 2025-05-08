import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CardDetailView from '../screens/CardList/CardDetailView';
import CardListView from '../screens/CardList/CardListView';

export type StackParamList = {
	CardList: undefined;
	CardDetail: { cardId: number };
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function CardListStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="CardList" component={CardListView} />
			<Stack.Screen name="CardDetail" component={CardDetailView} />
		</Stack.Navigator>
	);
}

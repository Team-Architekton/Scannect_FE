import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CardDetailView from '../screens/CardList/CardDetailView';
import CardListView from '../screens/CardList/CardListView';

const Stack = createNativeStackNavigator();

export default function CardListStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="명함 리스트" component={CardListView} />
			<Stack.Screen name="명함 상세" component={CardDetailView} />
		</Stack.Navigator>
	);
}

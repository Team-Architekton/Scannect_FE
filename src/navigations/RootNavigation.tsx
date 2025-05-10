import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CardListStack from './CardListStack';
import ExchangeStack from './ExchangeStack';
import MyPageStack from './MyPageStack';

const Tab = createBottomTabNavigator();

export default function RootNavigation() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				<Tab.Screen name="명함리스트" component={CardListStack} />
				<Tab.Screen name="명함교환" component={ExchangeStack} />
				<Tab.Screen name="마이페이지" component={MyPageStack} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}

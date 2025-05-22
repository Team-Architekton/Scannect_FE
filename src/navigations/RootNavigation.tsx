import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CardListStack from './CardListStack';
import ExchangeStack from './ExchangeStack';
import MyPageStack from './MyPageStack';
import { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function RootNavigation() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				<Tab.Screen
					name="CardListTab"
					component={CardListStack}
					options={{ title: '명함리스트' }}
				/>
				<Tab.Screen name="ExchangeTab" component={ExchangeStack} options={{ title: '명함교환' }} />
				<Tab.Screen name="MyPageTab" component={MyPageStack} options={{ title: '마이페이지' }} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CardListStack from './CardListStack';
import ExchangeStack from './ExchangeStack';
import MyPageStack from './MyPageStack';
import { RootTabParamList } from './types';
import AuthStack from './AuthStack';
import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function RootNavigation() {
	const isLoggedIn = useAuthStore(state => state.isLoggedIn);
	const initLoginStatus = useAuthStore(state => state.initLoginStatus);

	useEffect(() => {
		initLoginStatus();
	}, []);

	return (
		<NavigationContainer>
			{isLoggedIn ? (
				<Tab.Navigator
					screenOptions={({ route }) => ({
						headerShown: false,
						tabBarIcon: ({ focused, color, size }) => {
							let iconName: string = 'ellipse-outline';

							if (route.name === 'CardListTab') {
								iconName = focused ? 'id-card' : 'id-card-outline';
							} else if (route.name === 'ExchangeTab') {
								iconName = focused ? 'repeat' : 'repeat-outline';
							} else if (route.name === 'MyPageTab') {
								iconName = focused ? 'person' : 'person-outline';
							}

							return <Ionicons name={iconName as any} size={size} color={color} />;
						},
						tabBarActiveTintColor: '#05AA5B',
						tabBarInactiveTintColor: 'gray',
					})}
				>
					<Tab.Screen
						name="CardListTab"
						component={CardListStack}
						options={{ title: '명함리스트' }}
					/>
					<Tab.Screen
						name="ExchangeTab"
						component={ExchangeStack}
						options={{ title: '명함교환' }}
					/>
					<Tab.Screen name="MyPageTab" component={MyPageStack} options={{ title: '마이페이지' }} />
				</Tab.Navigator>
			) : (
				<AuthStack />
			)}
		</NavigationContainer>
	);
}

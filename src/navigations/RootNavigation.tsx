import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CardListStack from './CardListStack';
import ExchangeStack from './ExchangeStack';
import MyPageStack from './MyPageStack';
import { RootTabParamList } from './types';
import AuthStack from './AuthStack';
import { useEffect, useState } from 'react';
import { getIsLoggedIn } from '../utils/authStorage';
import { useAuthStore } from '../store/authStore';

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
				<Tab.Navigator screenOptions={{ headerShown: false }}>
					<Tab.Screen name="명함리스트" component={CardListStack} />
					<Tab.Screen name="명함교환" component={ExchangeStack} />
					<Tab.Screen name="마이페이지" component={MyPageStack} />
				</Tab.Navigator>
			) : (
				<AuthStack />
			)}
		</NavigationContainer>
	);
}

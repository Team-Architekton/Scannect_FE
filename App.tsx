import { useEffect, useState } from 'react';
import { getIsLoggedIn } from './src/utils/authStorage';
import RootNavigation from './src/navigations/RootNavigation';
import AuthStack from './src/navigations/AuthStack';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const checkLogin = async () => {
			const result = await getIsLoggedIn();
			setIsLoggedIn(result);
			setIsReady(true);
		};
		checkLogin();
	}, []);

	if (!isReady) return null;

	return (
		<NavigationContainer>{isLoggedIn ? <RootNavigation /> : <AuthStack />}</NavigationContainer>
	);
}

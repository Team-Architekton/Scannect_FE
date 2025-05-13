import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GPSView from '../screens/Exchange/GPSView';
import QRView from '../screens/Exchange/QRView';

const Stack = createNativeStackNavigator();

export default function ExchangeStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="명함 교환" component={GPSView} />
			<Stack.Screen name="qr-generate" component={QRView} />
			<Stack.Screen name="qr-scan" component={QRView} />
			<Stack.Screen name="paper-scan" component={QRView} />
		</Stack.Navigator>
	);
}

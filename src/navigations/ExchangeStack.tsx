import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GPSView from '../screens/Exchange/GPSView';
import QRGenerationView from '../screens/Exchange/QRGenerationView';
import QRScanView from '../screens/Exchange/QRScanView';

const Stack = createNativeStackNavigator();

export default function ExchangeStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="명함 교환" component={GPSView} />
			<Stack.Screen
				name="QRGenerate"
				component={QRGenerationView}
				options={{ title: 'QR 코드 생성' }}
			/>
			<Stack.Screen name="QRScan" component={QRScanView} options={{ title: 'QR 코드 스캔' }} />
			<Stack.Screen name="PaperScan" component={QRGenerationView} options={{ title: 'OCR 교환' }} />
		</Stack.Navigator>
	);
}

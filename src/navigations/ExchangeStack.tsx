import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GPSView from "../screens/Exchange/GPSView";

const Stack = createNativeStackNavigator();

export default function ExchangeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="명함 교환" component={GPSView} />
        </Stack.Navigator>
    )
};
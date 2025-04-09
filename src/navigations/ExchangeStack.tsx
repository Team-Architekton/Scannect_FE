import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GPS from "../screens/ExchangeView/GPS";

const Stack = createNativeStackNavigator();

export default function ExchangeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="명함 교환" component={GPS} />
        </Stack.Navigator>
    )
};
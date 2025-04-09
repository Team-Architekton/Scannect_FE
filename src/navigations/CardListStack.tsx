import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CardList from "../screens/CardListView/CardList";
import CardDetail from "../screens/CardListView/CardDetail";

const Stack = createNativeStackNavigator();

export default function CardListStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="명함 리스트" component={CardList}/>
            <Stack.Screen name="명함 상세" component={CardDetail}/>
        </Stack.Navigator>
    )
};
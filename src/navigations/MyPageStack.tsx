import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPageView from "../screens/MyPage/MypageView";
import CardCreateView from "../screens/MyPage/CardCreateView";

const Stack = createNativeStackNavigator();

export default function MyPageStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="마이페이지" component={MyPageView}/>
            <Stack.Screen name="명함 생성" component={CardCreateView} />
        </Stack.Navigator>
    )
};
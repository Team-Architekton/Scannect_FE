import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPage from "../screens/MyPageView/Mypage";
import CardCreate from "../screens/MyPageView/CardCreate";

const Stack = createNativeStackNavigator();

export default function MyPageStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="마이페이지" component={MyPage}/>
            <Stack.Screen name="명함 생성" component={CardCreate} />
        </Stack.Navigator>
    )
};
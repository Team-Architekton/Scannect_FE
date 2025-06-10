import RootNavigation from './src/navigations/RootNavigation';
import Toast from 'react-native-toast-message';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

export default function App() {
    return (
        <ActionSheetProvider>
            <>
                <RootNavigation />
                <Toast />
            </>
        </ActionSheetProvider>
    );
}
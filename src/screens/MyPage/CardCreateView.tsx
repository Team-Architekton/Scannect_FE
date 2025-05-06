import { ScrollView } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import CardCreateForm from '../../components/cardCRUD/CardCreateForm';

export default function CardCreateView() {
	return (
		<ScreenContainer>
			<ScrollView showsVerticalScrollIndicator={false}>
				<CardCreateForm />
			</ScrollView>
		</ScreenContainer>
	);
};

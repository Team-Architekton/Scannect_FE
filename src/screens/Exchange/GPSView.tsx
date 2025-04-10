/* eslint-disable prettier/prettier */
import { View, Text } from 'react-native';
import CommonButton from '../../components/CommonButton';
import commonStyles from '../../styles/commonStyles';
import ScreenContainer from '../../components/ScreenContainer';

export default function GPSView() {
	return (
		<ScreenContainer>
			<View style={commonStyles.sectionBox}>
				<Text style={commonStyles.titleText}>화이팅</Text>
				<Text style={commonStyles.bodyBoldText}>화이팅</Text>
				<Text style={commonStyles.bodyText}>화이팅</Text>
				<Text style={commonStyles.errorText}>화이팅</Text>
				<Text style={commonStyles.subtitleText}>화이팅</Text>
			</View>
			<CommonButton title="하이" onPress={() => console.log('버튼 클릭')} />
		</ScreenContainer>
	);
}

/* eslint-disable prettier/prettier */
import { View, Text } from 'react-native';
import CommonButton from '../../components/CommonButton';
import commonStyles from '../../styles/commonStyles';
import ScreenContainer from '../../components/ScreenContainer';
import GPSSwitch from '../../components/gps/GPSSwitch';
import GPSSectionList from '../../components/gps/GPSList';
import { useGPSStore } from '../../store/gpsStore';
import { useEffect } from 'react';
import { dummyData } from '../../model/gpsUser';

export default function GPSView() {
	const { gpsUserList, selectedUserId, setGPSUserList } = useGPSStore();

	useEffect(() => {
		setGPSUserList(dummyData); // 더미 데이터 주입
	}, []);
	
	return (
		<ScreenContainer>
			<View style={commonStyles.sectionBox}>
				<Text style={commonStyles.titleText}>명함 교환</Text>
				<GPSSwitch></GPSSwitch>
				<GPSSectionList data={gpsUserList} />
			</View>
		</ScreenContainer>
	);
}

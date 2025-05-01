/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet } from 'react-native';
import CommonButton from '../../components/CommonButton';
import commonStyles from '../../styles/commonStyles';
import ScreenContainer from '../../components/ScreenContainer';
import GPSSwitch from '../../components/gps/GPSSwitch';
import GPSSectionList from '../../components/gps/GPSList';
import { useGPSStore } from '../../store/gpsStore';
import { useEffect } from 'react';
import { dummyData } from '../../model/gpsUser';
import spacing from '../../styles/spacing';

export default function GPSView() {
	const { gpsUserList, selectedUserIds, setGPSUserList } = useGPSStore();

	useEffect(() => {
		setGPSUserList(dummyData); 
	}, []);
	
	return (
		<ScreenContainer>
			<View style={styles.header}>
				<Text style={commonStyles.titleText}>명함 교환</Text>
				<GPSSwitch></GPSSwitch>
			</View>
			<GPSSectionList data={gpsUserList} />
			<View style={styles.footer}>
			<CommonButton
							title="선택한 유저와 교환"
							onPress={() => console.log(selectedUserIds)}
							buttonStyle={{ marginTop: 18 }}
							size='large'
				/>
			<CommonButton
							title="다른 방법으로 교환"
							onPress={() => console.log('clicked')}
							buttonStyle={{ marginTop: 18 }}
							size='large'
				/>
			</View>			
		</ScreenContainer>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: spacing.m,
	},
	footer: {
		marginVertical: spacing.m,
	},
})
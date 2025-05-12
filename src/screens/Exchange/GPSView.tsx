/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet } from 'react-native';
import CommonButton from '../../components/CommonButton';
import commonStyles from '../../styles/commonStyles';
import ScreenContainer from '../../components/ScreenContainer';
import GPSSwitch from '../../components/gps/GPSSwitch';
import GPSSectionList from '../../components/gps/GPSList';
import { useGPSStore } from '../../store/gpsStore';
import { useEffect, useState } from 'react';
import { dummyData } from '../../model/gpsUser';
import spacing from '../../styles/spacing';
import GPSOffView from '../../components/gps/GPSOffView';
import ExchangeBottomSheet from '../../components/gps/ExchangeBottomSheet';

export default function GPSView() {
	const { gpsUserList, selectedUserIds, setGPSUserList, isLocationOn } = useGPSStore();
	const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

	useEffect(() => {
		setGPSUserList(dummyData);
	}, []);

	const handleExchangeOption = (type: 'qr-generate' | 'qr-scan' | 'paper-scan') => {
		console.log('클릭한 뷰로 이동 :', type);
		setBottomSheetVisible(false);
	};

	return (
		<ScreenContainer>
			<View style={styles.header}>
				<View style={styles.headerText}>
					<Text style={commonStyles.titleText}>명함 교환</Text>
					<Text style={commonStyles.captionText}>교환 할 유저를 선택하세요</Text>
				</View>
				<GPSSwitch></GPSSwitch>
			</View>
			{isLocationOn ? <GPSSectionList data={gpsUserList} /> : <GPSOffView />}
			<View style={styles.footer}>
				<CommonButton
					title="선택한 유저와 교환"
					onPress={() => console.log(selectedUserIds)}
					buttonStyle={{ marginTop: spacing.s }}
					size="large"
				/>
				<CommonButton
					title="다른 방법으로 교환"
					onPress={() => setBottomSheetVisible(true)}
					buttonStyle={{ marginTop: spacing.s }}
					size="large"
				/>
			</View>
			<ExchangeBottomSheet
				visible={isBottomSheetVisible}
				onClose={() => setBottomSheetVisible(false)}
				onSelect={type => {
					handleExchangeOption(type);
					setBottomSheetVisible(false);
				}}
			/>
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
	headerText: {
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'flex-start',
	},
	footer: {
		marginVertical: spacing.m,
	},
});

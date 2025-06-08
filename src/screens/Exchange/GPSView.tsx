/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, Alert } from 'react-native';
import CommonButton from '../../components/CommonButton';
import commonStyles from '../../styles/commonStyles';
import ScreenContainer from '../../components/ScreenContainer';
import GPSSwitch from '../../components/gps/GPSSwitch';
import GPSSectionList from '../../components/gps/GPSList';
import { useGPSStore } from '../../store/gpsStore';
import { useEffect, useState } from 'react';
import spacing from '../../styles/spacing';
import GPSOffView from '../../components/gps/GPSOffView';
import ExchangeBottomSheet from '../../components/gps/ExchangeBottomSheet';
import DropdownMenu from '../../components/mypage/elements/Dropdown';
import { useAuthStore } from '../../store/authStore';
import { WebSocketManager } from '../../server/webSocketManager';

export default function GPSView({ navigation }: any) {
	const { gpsUserList, selectedUserIds, alertMessage, setAlertMessage, isLocationOn } =
		useGPSStore();
	const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

	const { id: currentUserId } = useAuthStore(); // 현재 유저의 ID

	const handleSendRequests = () => {
		if (selectedUserIds.length === 0) {
			Alert.alert('알림', '선택된 유저가 없습니다.');
			return;
		}

		selectedUserIds.forEach(toUserId => {
			const request = {
				type: 'request' as const,
				fromUserId: 'userB',
				toUserId: '123456',
				cardId: 4,
				message: '명함 교환 요청드립니다!',
			};

			WebSocketManager.sendMessage(request);
			console.log('📤 명함 요청 전송:', request);
		});
	};

	useEffect(() => {
		if (alertMessage) {
			Alert.alert('명함 요청', alertMessage, [
				{
					text: '확인',
					onPress: () => setAlertMessage(null),
				},
			]);
		}
	}, [alertMessage]);

	const handleExchangeOption = (type: 'QRGenerate' | 'QRScan' | 'PaperScan') => {
		//console.log('클릭한 뷰로 이동 :', type);
		navigation.navigate(type);
		setBottomSheetVisible(false);
	};

	return (
		<ScreenContainer>
			<View style={styles.header}>
				<View style={styles.headerText}>
					<DropdownMenu />
				</View>
				<GPSSwitch></GPSSwitch>
			</View>
			{isLocationOn ? <GPSSectionList data={gpsUserList} /> : <GPSOffView />}
			<View style={styles.footer}>
				<CommonButton
					title="선택한 유저와 교환"
					onPress={() => handleSendRequests()}
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

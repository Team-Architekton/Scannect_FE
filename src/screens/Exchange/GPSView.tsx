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
import { useMypageStore } from '../../store/useMyPageStore';

export default function GPSView({ navigation }: any) {
	const {
		gpsUserList,
		selectedUserIds,
		exchangeUserId,
		setExchangeUserId,
		isLocationOn,
		notifyMessage,
		setNotifyMessage,
	} = useGPSStore();
	const { selectedCard } = useMypageStore() as { selectedCard: { id: number } | null };
	const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

	const { id: currentUserId } = useAuthStore(); // 현재 유저의 ID

	const handleSendRequests = () => {
		if (selectedUserIds.length === 0) {
			Alert.alert('알림', '선택된 유저가 없습니다.');
			return;
		}

		selectedUserIds.forEach(toUserId => {
			if (selectedCard && typeof selectedCard.id === 'number') {
				const request = {
					type: 'request' as const,
					fromUserId: currentUserId,
					toUserId: toUserId,
					cardId: selectedCard.id,
					message: '명함 교환 요청드립니다!',
				};

				WebSocketManager.sendMessage(request);
				console.log('📤 명함 요청 전송:', request);
			} else {
				console.warn('선택된 명함이 없거나 올바르지 않습니다.');
			}
		});
	};

	useEffect(() => {
		if (notifyMessage) {
			Alert.alert('알림', notifyMessage, [
				{
					text: '확인',
					onPress: () => setNotifyMessage(null),
				},
			]);
		}
	}, [notifyMessage]);

	useEffect(() => {
		if (exchangeUserId) {
			Alert.alert('명함 요청', `${exchangeUserId}가 교환을 요청했어요!`, [
				{
					text: '수락',
					onPress: () => {
						WebSocketManager.sendMessage({
							type: 'request',
							fromUserId: currentUserId,
							toUserId: exchangeUserId,
							cardId: selectedCard?.id ?? 0,
							status: 'accept',
						});
						setExchangeUserId(null);
					},
				},
				{
					text: '취소',
					style: 'cancel',
					onPress: () => {
						setExchangeUserId(null);
					},
				},
			]);
		}
	}, [exchangeUserId]);

	const handleExchangeOption = (type: 'QRGenerate' | 'QRScan' | 'PaperScan') => {
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

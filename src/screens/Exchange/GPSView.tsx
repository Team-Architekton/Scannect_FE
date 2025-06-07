/* eslint-disable prettier/prettier */
import { View, StyleSheet } from 'react-native';
import CommonButton from '../../components/CommonButton';
import ScreenContainer from '../../components/ScreenContainer';
import GPSSwitch from '../../components/gps/GPSSwitch';
import GPSSectionList from '../../components/gps/GPSList';
import { useGPSStore } from '../../store/gpsStore';
import { useState } from 'react';
import spacing from '../../styles/spacing';
import GPSOffView from '../../components/gps/GPSOffView';
import ExchangeBottomSheet from '../../components/gps/ExchangeBottomSheet';
import DropdownMenu from '../../components/mypage/elements/Dropdown';
import OCRImageSourceModal from '../../components/ocr/OCRImageSourceModal';

export default function GPSView({ navigation }: any) {
	const { gpsUserList, selectedUserIds, setGPSUserList, isLocationOn } = useGPSStore();
	const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
	const [isImageSourceModalVisible, setImageSourceModalVisible] = useState(false);

	const handleExchangeOption = (type: 'QRGenerate' | 'QRScan' | 'PaperScan') => {
		setBottomSheetVisible(false);
		if (type === 'PaperScan') {
			setImageSourceModalVisible(true);
		} else {
			navigation.navigate(type);
		}
	};

	return (
		<ScreenContainer>
			<View style={styles.header}>
				<View style={styles.headerText}>
					<DropdownMenu showCreateOption={false} />
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
			<OCRImageSourceModal
				visible={isImageSourceModalVisible}
				onClose={() => setImageSourceModalVisible(false)}
				onSelect={(source, imageUri) => {
					setImageSourceModalVisible(false);
					navigation.navigate('PaperScan', { source, imageUri });
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

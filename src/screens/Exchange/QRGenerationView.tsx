import { Text, View, StyleSheet, Alert } from 'react-native';

import ScreenContainer from '../../components/ScreenContainer';
import QRCodeSection from '../../components/qrcode/QRCodeSection';
import commonStyles from '../../styles/commonStyles';
import spacing from '../../styles/spacing';
import colors from '../../styles/Colors';
import { useMypageStore } from '../../store/useMyPageStore';

export default function QRGenerationView({ navigation }: any) {
	const { selectedCard: card } = useMypageStore();
	const qrUrl = `scannect://cardlist-tab/card-detail/${card?.id}`; // 명함 id

	if (!card) {
		Alert.alert('공유할 수 있는 명함이 없습니다!', '확인 후 다시 시도해주세요.', [
			{
				text: '확인',
				onPress: () => navigation.goBack(),
			},
		]);
	}

	return (
		<ScreenContainer>
			<View style={styles.container}>
				<View style={styles.textWrapper}>
					<Text style={commonStyles.subtitleText}>내 명함으로 QR코드를 만들었어요.</Text>
					<Text style={commonStyles.bodyBoldText}>
						이제 나만의 명함을 저장하고 공유할 수 있어요.
					</Text>
					<Text style={[commonStyles.captionText, styles.exchangedCardInfo]}>{card?.cardName}</Text>
				</View>
				<QRCodeSection value={qrUrl} />
			</View>
		</ScreenContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: spacing.m,
		marginTop: spacing.xxl,
	},
	textWrapper: {
		alignItems: 'center',
		gap: spacing.s,
		marginBottom: spacing.l,
	},
	exchangedCardInfo: {
		position: 'absolute',
		top: -40,
		left: 0,
		backgroundColor: colors.paleGreen,
		paddingVertical: spacing.s,
		paddingHorizontal: spacing.sm,
		borderRadius: 7,
	},
});

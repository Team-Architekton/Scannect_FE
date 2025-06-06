import { Text, View, StyleSheet } from 'react-native';

import ScreenContainer from '../../components/ScreenContainer';
import QRCodeSection from '../../components/qrcode/QRCodeSection';
import commonStyles from '../../styles/commonStyles';
import spacing from '../../styles/spacing';
import colors from '../../styles/Colors';
import { useMypageStore } from '../../store/useMyPageStore';

export default function QRGenerationView() {
	const exampleID = 1; // QR 생성을 위한 id 데이터
	const qrUrl = `scannect://cardlist-tab/card-detail/${exampleID}`; // url은 컨벤션상 kebab-case로 작성 -> 인식하려면 Navigation Linking 설정 필요
	const { selectedCard } = useMypageStore();

	return (
		<ScreenContainer>
			<View style={styles.container}>
				<View style={styles.textWrapper}>
					<Text style={commonStyles.subtitleText}>나의 기본명함으로 QR코드를 만들었어요.</Text>
					<Text style={commonStyles.bodyBoldText}>
						이제 나만의 명함을 저장하고 공유할 수 있어요.
					</Text>
					<Text style={[commonStyles.captionText, styles.exchangedCardInfo]}>
						{selectedCard?.title}
					</Text>
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
		left: 30,
		backgroundColor: colors.paleGreen,
		paddingVertical: spacing.s,
		paddingHorizontal: spacing.sm,
		borderRadius: 7,
	},
});

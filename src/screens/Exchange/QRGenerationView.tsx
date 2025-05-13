import { Text, View, StyleSheet } from 'react-native';

import ScreenContainer from '../../components/ScreenContainer';
import MyQRCode from '../../components/qrcode/MyQRCode';
import commonStyles from '../../styles/commonStyles';
import spacing from '../../styles/spacing';
import colors from '../../styles/Colors';
import CommonButton from '../../components/CommonButton';

const exampleID = 1; // QR 생성을 위한 임시 id 데이터
const deepLinkUrl = `scannect://CardListTab/CardDetail?cardId=${exampleID}`; // 딥링크로 처리 시도 예정, 어려우면 id만 담아서 qr 생성하는 방식으로 변경

export default function QRGenerationView() {
	return (
		<ScreenContainer>
			<View style={styles.container}>
				<View style={styles.textWrapper}>
					<Text style={commonStyles.subtitleText}>나의 기본명함으로 QR코드를 만들었어요.</Text>
					<Text style={commonStyles.bodyBoldText}>
						이제 나만의 명함을 저장하고 공유할 수 있어요.
					</Text>
				</View>
				<View style={styles.qrcodeContainer}>
					<MyQRCode value={deepLinkUrl} />
				</View>
				<Text style={[commonStyles.bodyBoldText, { marginBottom: spacing.l }]}>
					QR코드를 공유하고 내 명함을 전달해보세요!
				</Text>
				<CommonButton title="내 명함 공유하러 가기" onPress={() => {}} />
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
	qrcodeContainer: {
		...commonStyles.sectionBox,
		padding: spacing.xxl,
		shadowColor: colors.darkGreen,
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.25,
		shadowRadius: 10,
		elevation: 5,
	},
});

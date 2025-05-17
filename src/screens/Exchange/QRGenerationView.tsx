import { Text, View, StyleSheet } from 'react-native';

import ScreenContainer from '../../components/ScreenContainer';
import QRCodeSection from '../../components/qrcode/QRCodeSection';
import commonStyles from '../../styles/commonStyles';
import spacing from '../../styles/spacing';
import colors from '../../styles/Colors';

export default function QRGenerationView() {
	const exampleID = 1; // QR 생성을 위한 id 데이터
	const qrUrl = `scannect://cardlist-tab/card-detail/${exampleID}`; // url은 컨벤션상 kebab-case로 작성 -> 인식하려면 Navigation Linking 설정 필요
	//const qrUrl = 'https://github.com/Team-Architekton/Scannect_FE'; // qr 생성 테스트를 위한 임시 url

	return (
		<ScreenContainer>
			<View style={styles.container}>
				<View style={styles.textWrapper}>
					<Text style={commonStyles.subtitleText}>나의 기본명함으로 QR코드를 만들었어요.</Text>
					<Text style={commonStyles.bodyBoldText}>
						이제 나만의 명함을 저장하고 공유할 수 있어요.
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
});

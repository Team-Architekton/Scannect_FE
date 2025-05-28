import { View, StyleSheet, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { useQRCode } from '../../hooks/useQRCode';
import commonStyles from '../../styles/commonStyles';
import CommonButton from '../CommonButton';
import spacing from '../../styles/spacing';
import colors from '../../styles/Colors';

interface IQRCodeProp {
	value: string;
}

export default function QRCodeSection({ value }: IQRCodeProp) {
	const { qrRef, shareQR } = useQRCode();
	const logoFile = require('../../assets/teamLogo.jpeg');

	const handlePress = () => shareQR();

	return (
		<>
			<View style={styles.qrcodeContainer}>
				<QRCode
					getRef={c => (qrRef.current = c)}
					value={value}
					size={250}
					ecl="H"
					quietZone={30}
					logo={logoFile}
					logoBackgroundColor="transparent"
					logoBorderRadius={5}
				/>
			</View>
			<Text style={[commonStyles.bodyBoldText, { marginBottom: spacing.l }]}>
				QR코드를 공유하고 내 명함을 전달해보세요!
			</Text>
			<CommonButton title="내 명함 공유하러 가기" onPress={handlePress} />
		</>
	);
}

const styles = StyleSheet.create({
	qrcodeContainer: {
		...commonStyles.sectionBox,
		padding: spacing.sm,
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

import QRCode from 'react-native-qrcode-svg';

interface IQRCodeProp {
	value: string;
}

const logoURL = 'https://avatars.githubusercontent.com/u/204213236?s=200&v=4';

export default function MyQRCode({ value }: IQRCodeProp) {
	return (
		<QRCode
			value={value}
			size={200}
			ecl="H"
			logo={{ uri: logoURL }}
			logoBackgroundColor="transparent"
			logoBorderRadius={5}
		/>
	);
}

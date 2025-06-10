import { View, Text, StyleSheet } from 'react-native';
import spacing from '../../styles/spacing';
import colors from '../../styles/Colors';
import typography from '../../styles/typography';
import CommonButton from '../CommonButton';
import { useNavigation } from '@react-navigation/native';

type Props = {
	message?: string;
};

export default function EmptyView({ message = '등록된 명함이 없습니다.' }: Props) {
    const navigation = useNavigation<any>();

	return (
		<View style={styles.container}>
			<Text style={[typography.bodyBold, styles.message]}>{message}</Text>
            <CommonButton title="내 명함 생성하기" onPress={() => {navigation.navigate('명함 생성')}} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: spacing.l,
	},
	message: {
		color: colors.grayscaleGray5,
		textAlign: 'center',
        marginBottom: spacing.l,
	},
});

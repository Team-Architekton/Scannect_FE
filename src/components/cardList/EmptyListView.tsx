import { Text, ScrollView, RefreshControl, StyleSheet } from 'react-native';

import commonStyles from '../../styles/commonStyles';
import colors from '../../styles/Colors';
import CommonButton from '../../components/CommonButton';
import spacing from '../../styles/spacing';
import { useRefresh } from '../../hooks/useRefresh';

export default function EmptyListView({ navigation }: any) {
	const { refreshing, handleRefresh } = useRefresh();

	return (
		<ScrollView
			contentContainerStyle={styles.emptyListView}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
		>
			<Text style={styles.emptyListText}>저장된 명함이 없습니다.</Text>
			<Text style={styles.emptyListText}>명함을 저장하고 인맥을 관리해보세요!</Text>
			<CommonButton
				title="명함 교환하러 가기"
				onPress={() => navigation.navigate('ExchangeTab', { screen: '명함 교환' })}
				buttonStyle={{ marginTop: spacing.m }}
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	headerTitle: { ...commonStyles.titleText, marginTop: 30 },
	mainLabelWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	mainLabel: { ...commonStyles.bodyText, color: colors.grayscaleGray7 },
	emptyListView: {
		marginTop: '40%',
		alignItems: 'center',
	},
	emptyListText: {
		...commonStyles.bodyText,
		color: colors.grayscaleGray6,
		marginBottom: spacing.xs,
	},
});

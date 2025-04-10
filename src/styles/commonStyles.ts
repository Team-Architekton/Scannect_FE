import { StyleSheet } from 'react-native';
import spacing from './spacing';
import typography from './typography';
import colors from './colors';

const commonStyles = StyleSheet.create({
	mainButton: {
		backgroundColor: colors.primary,
		paddingVertical: 16,
		paddingHorizontal: 20,
		borderRadius: 8,
		alignItems: 'center',
	},
	mainButtonText: {
		color: colors.white,
		fontSize: 16,
		fontWeight: '600',
	},
	sectionBox: {
		backgroundColor: colors.bgGray,
		borderRadius: 12,
		padding: spacing.m,
		marginBottom: spacing.m,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleText: {
		...typography.h1,
		color: colors.black,
	},
	subtitleText: {
		...typography.h2,
		color: colors.black,
	},
	bodyText: {
		...typography.body,
		color: colors.grayscaleGray7,
	},
	bodyBoldText: {
		...typography.bodyBold,
		color: colors.black,
	},
	captionText: {
		...typography.caption,
		color: colors.grayscaleGray5,
	},
	errorText: {
		...typography.body,
		color: 'red',
	},
});

export default commonStyles;

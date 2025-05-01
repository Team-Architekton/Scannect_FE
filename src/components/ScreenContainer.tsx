import React from 'react';
import { SafeAreaView, StyleSheet, ViewStyle, ViewProps, View } from 'react-native';
import colors from '../styles/Colors';
import spacing from '../styles/spacing';

interface ScreenContainerProps extends ViewProps {
	children: React.ReactNode;
	style?: ViewStyle;
	noPadding?: boolean;
	backgroundColor?: string;
}

const ScreenContainer = ({
	children,
	style,
	noPadding = false,
	backgroundColor = colors.bgWhite,
	...props
}: ScreenContainerProps) => {
	return (
		<SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
			<View style={[styles.container, noPadding && styles.noPadding, style]} {...props}>
				{children}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	container: {
		flex: 1,
		paddingHorizontal: spacing.l,
		paddingVertical: spacing.m,
	},
	noPadding: {
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
});

export default ScreenContainer;

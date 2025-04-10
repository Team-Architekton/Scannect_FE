import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import commonStyles from '../styles/commonStyles';

interface CommonButtonProps {
	title: string;
	onPress: () => void;
	buttonStyle?: ViewStyle;
	textStyle?: TextStyle;
}

const CommonButton: React.FC<CommonButtonProps> = ({ title, onPress, buttonStyle, textStyle }) => {
	return (
		<TouchableOpacity
			style={[commonStyles.mainButton, buttonStyle]}
			onPress={onPress}
			activeOpacity={0.8}
		>
			<Text style={[commonStyles.mainButtonText, textStyle]}>{title}</Text>
		</TouchableOpacity>
	);
};

export default CommonButton;

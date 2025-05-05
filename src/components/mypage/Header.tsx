import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Dropdown from './elements/Dropdown';

export default function Header() {
	return (
		<View>
			<Dropdown/>
		</View>
	);
};

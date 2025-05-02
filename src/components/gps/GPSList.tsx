import { FlatList } from 'react-native';
import { IGpsUser } from '../../model/gpsUser';
import React from 'react';
import GPSUserItem from './GPSUserItem';

export default function GPSSectionList({ data }: { data: IGpsUser[] }) {
	return (
		<FlatList
			data={data}
			keyExtractor={item => item.id.toString()}
			renderItem={({ item }) => <GPSUserItem user={item} />}
		/>
	);
}

import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useCardList } from './useCardList';

export const useRefresh = () => {
	const { handleFetchCards } = useCardList();
	const [refreshing, setRefreshing] = useState(false);

	const handleRefresh = useCallback(async () => {
		setRefreshing(true);
		const success = await handleFetchCards(false);
		if (!success) Alert.alert('처리 실패', '잠시 후 다시 시도해주세요.');
		setRefreshing(false);
	}, [handleFetchCards]);

	return { refreshing, handleRefresh };
};

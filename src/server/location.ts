import { httpClient } from './http';

// 위치 공유 ON
export const postActivateLocation = async (userId: string, latitude: number, longitude: number) => {
	try {
		const { data } = await httpClient.post('/location/activate', {
			userId,
			latitude,
			longitude,
		});
		return data;
	} catch (error) {
		console.error('위치 공유 활성화 실패:', error);
		throw error;
	}
};

// 위치 공유 OFF
export const postDeactivateLocation = async (userId: string) => {
	try {
		const { data } = await httpClient.post('/location/deactivate', {
			userId,
		});
		return data;
	} catch (error) {
		console.error('위치 공유 비활성화 실패:', error);
		throw error;
	}
};

import { useRef } from 'react';
import { postActivateLocation, postDeactivateLocation } from '../server/location';

export const useWebSocket = () => {
	const socketRef = useRef<WebSocket | null>(null);

	const connect = (userId: string, latitude: number, longitude: number) => {
		const ws = new WebSocket(`wss://scannect-be.onrender.com/ws?userId=${userId}`);

		ws.onopen = async () => {
			console.log('✅ WebSocket 연결됨');
			try {
				await postActivateLocation(userId, latitude, longitude);
				console.log('📡 위치 활성화 요청 전송 완료');
			} catch (e) {
				console.error('❗ 위치 활성화 요청 실패:', e);
			}
		};

		ws.onmessage = event => {
			try {
				const message = JSON.parse(event.data);
				console.log('📩 받은 메시지:', message);
			} catch (err) {
				console.error('❗ 메시지 파싱 실패:', err);
			}
		};

		ws.onerror = err => {
			console.error('❗ WebSocket 오류:', err);
		};

		ws.onclose = () => {
			console.log('❌ WebSocket 연결 종료됨');
		};

		socketRef.current = ws;
	};

	const disconnect = async (userId: string) => {
		return new Promise<void>(resolve => {
			const socket = socketRef.current;
			if (!socket) {
				console.log('⚠️ 연결된 소켓 없음');
				resolve();
				return;
			}

			socket.onclose = async () => {
				console.log('❌ WebSocket 연결 종료됨');
				try {
					await postDeactivateLocation(userId);
					console.log('📴 위치 비활성화 요청 전송 완료');
				} catch (e) {
					console.error('❗ 위치 비활성화 요청 실패:', e);
				}
				resolve();
			};

			socket.close();
			socketRef.current = null;
		});
	};

	return { connect, disconnect };
};

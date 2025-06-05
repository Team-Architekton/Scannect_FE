import { useRef } from 'react';
import { postActivateLocation, postDeactivateLocation } from '../server/location';
import { useGPSStore } from '../store/gpsStore';
import { CardListMessage, WSMessage } from '../model/wsCard';

export const useWebSocket = () => {
	const socketRef = useRef<WebSocket | null>(null);

	const connect = (userId: string, latitude: number, longitude: number) => {
		const ws = new WebSocket(`wss://scannect-be.onrender.com/ws?userId=${userId}`);
		console.log('🔗 WebSocket 연결 시도:', ws.url);

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
				const message: WSMessage = JSON.parse(event.data);
				console.log('📩 전체 수신 메시지:', message);

				switch (message.type) {
					case 'cardList':
						console.log('📇 카드 리스트 수신');
						useGPSStore.getState().setGPSUserList(
							message.cards.map(card => ({
								id: card.id,
								name: card.nickname ?? card.cardName ?? '이름없음',
								job: card.job,
								company: card.belongTo,
							}))
						);
						break;

					case 'request':
						console.log(
							`📨 [요청] ${message.fromUserId} → ${message.toUserId}: ${message.message}`
						);
						break;

					case 'response':
						console.log(
							`🤝 [응답] ${message.fromUserId} → ${message.toUserId}: ${message.status} (카드: ${message.fromCardId} ↔ ${message.toCardId})`
						);
						break;

					case 'notify':
						console.log(`🔔 [알림] ${message.message}`);
						break;

					default:
						console.log('📦 알 수 없는 메시지 타입:', (message as any).type);
						break;
				}
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

import { postActivateLocation, postDeactivateLocation } from './location';
import { useGPSStore } from '../store/gpsStore';
import { WSMessage } from '../model/wsCard';

let socket: WebSocket | null = null;

export const WebSocketManager = {
	connect: (userId: string, latitude: number, longitude: number) => {
		if (socket && socket.readyState <= 1) {
			console.log('⚠️ 이미 연결된 WebSocket이 존재함');
			return;
		}

		socket = new WebSocket(`wss://scannect-be.onrender.com/ws?userId=${userId}`);
		console.log('🔗 WebSocket 연결 시도:', socket.url);

		socket.onopen = async () => {
			console.log('✅ WebSocket 연결됨');
			try {
				await postActivateLocation(userId, latitude, longitude);
				console.log('📡 위치 활성화 요청 전송 완료');
			} catch (e) {
				console.error('❗ 위치 활성화 요청 실패:', e);
			}
		};

		socket.onmessage = event => {
			try {
				const message: WSMessage = JSON.parse(event.data);
				console.log('📩 전체 수신 메시지:', message);

				switch (message.type) {
					case 'cardList':
						useGPSStore.getState().setGPSUserList(
							message.cards.map(card => ({
								id: card.userId,
								name: card.nickname ?? card.cardName ?? '이름없음',
								job: card.job,
								company: card.belongTo,
							}))
						);
						break;

					case 'request':
						useGPSStore.getState().setAlertMessage(`${message.fromUserId}님이 요청을 보냈습니다.`);
						break;

					case 'response':
						console.log(`🤝 [응답] ${message.fromUserId} → ${message.toUserId}: ${message.status}`);
						break;

					case 'notify':
						console.log(`🔔 [알림] ${message.message}`);
						break;

					case 'remove':
						useGPSStore.getState().removeUserById(message.userId);
						break;

					default:
						console.log('📦 알 수 없는 메시지 타입:', (message as any).type);
						break;
				}
			} catch (err) {
				console.error('❗ 메시지 파싱 실패:', err);
			}
		};

		socket.onerror = err => {
			console.error('❗ WebSocket 오류:', err);
		};

		socket.onclose = () => {
			console.log('❌ WebSocket 연결 종료됨');
		};
	},

	disconnect: async (userId: string) => {
		if (!socket) {
			console.log('⚠️ 연결된 소켓 없음');
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
		};
		socket.close();
		socket = null;
	},

	sendMessage: (data: WSMessage) => {
		if (socket && socket.readyState === WebSocket.OPEN) {
			socket.send(JSON.stringify(data));
			console.log('📤 메시지 전송됨:', data);
		} else {
			console.warn('⚠️ WebSocket이 연결되지 않았거나 준비되지 않음');
		}
	},
};

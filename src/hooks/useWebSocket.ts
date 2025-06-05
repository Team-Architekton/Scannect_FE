import { useRef } from 'react';
import { postActivateLocation, postDeactivateLocation } from '../server/location';
import { useGPSStore } from '../store/gpsStore';

export const useWebSocket = () => {
	const socketRef = useRef<WebSocket | null>(null);

	const connect = (userId: string, latitude: number, longitude: number) => {
		const ws = new WebSocket(`wss://scannect-be.onrender.com/ws?userId=${userId}`);
		console.log('🔗 WebSocket 연결 시도:', ws.url);

		ws.onopen = async () => {
			console.log('✅ WebSocket 연결됨');
			setTimeout(async () => {
				try {
					await postActivateLocation(userId, latitude, longitude);
					console.log('📡 위치 활성화 요청 전송 완료');
				} catch (e) {
					console.error('❗ 위치 활성화 요청 실패:', e);
				}
			}, 3000);
		};

		ws.onmessage = event => {
			try {
				const message = JSON.parse(event.data) as CardListMessage;

				if (message.type === 'cardList') {
					console.log('📇 카드 리스트 수신');
					useGPSStore.getState().setGPSUserList(
						message.cards.map(card => ({
							id: card.id,
							name: card.nickname ?? card.cardName ?? '이름없음',
							job: card.job,
							company: card.belongTo,
						}))
					);
				}
				// ...
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

export interface WSCard {
	id: number;
	userId: string;
	cardName: string;
	nickname: string;
	email: string;
	job: string;
	industry: string;
	belongTo: string;
	department: string | null;
	position: string;
	content: string | null;
	companyTel: string | null;
	phoneNum: string | null;
	imgUrl: string | null;
	colour: string;
	urlList: string[] | null;
	is_active: boolean | null;
	createdAt: number;
	updatedAt: number;
}

export interface CardListMessage {
	type: 'cardList';
	cards: WSCard[];
}

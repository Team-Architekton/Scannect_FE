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

export interface WSRequestMessage {
	type: 'request';
	fromUserId: string;
	toUserId: string;
	cardId: number;
	message: string;
}

export interface WSResponseMessage {
	type: 'response';
	status: 'accept' | 'reject';
	fromUserId: string;
	toUserId: string;
	fromCardId: number;
	toCardId: number;
}

export interface WSNotifyMessage {
	type: 'notify';
	message: string;
}

export type WSMessage = CardListMessage | WSRequestMessage | WSResponseMessage | WSNotifyMessage;

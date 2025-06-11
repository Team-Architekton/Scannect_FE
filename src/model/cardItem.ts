export interface ICardItem {
	id: number; // 테이블 식별 id
	cardId: number; // 명함 id
	userId: string; // 로그인 아이디
	cardName: string; // 명함 이름
	nickname: string; // 유저 닉네임
	belongTo: string; // 소속
	department: string | null; // 부서
	position: string; // 직책
	industry: string; // 업종
	job: string; // 직무

	memo: string | null;
	favorite: boolean;
	isActive: boolean;
	colour: string;

	phoneNum: string;
	email: string;
	url: string | null;
	companyTel: string | null;
	imgUrl: string | null;
	content: string | null; // 자기소개
}

export interface ICardItem {
	id: number; // 테이블 식별 id
	cardId: number; // 명함 id
	userId: string; // 로그인 아이디
	cardName: string; // 명함 이름
	nickname: string; // 유저 닉네임
	belongTo: string; // 소속
	department: string; // 부서
	position: string; // 직급
	industry: string; // 업종
	job: string; // 직무

	memo: string;
	favorite: boolean;
	isActive: boolean;
	createdAt: string;

	phoneNum?: string;
	email?: string;
	urlList?: string[];
	companyTel?: string;

	imgUrl?: string | null;
	content?: string; // 자기소개
	colour?: string;
}

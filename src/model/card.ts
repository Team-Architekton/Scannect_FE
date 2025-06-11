export interface Card {
	id: number;
	cardName: string;
	nickname: string;
	belongTo: string;
	job: string;
	phoneNum: string;
	email: string;
	position: string;
	industry: string;

	department?: string;
	imgUrl?: string | null;
	content?: string;
	companyTel?: string;
	colour?: string;
	url?: string;

	isMain: boolean;
}

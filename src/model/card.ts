export interface Card {
	id: number;
	cardName: string;
	name: string;
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
	color?: string;
	website?: string;

	isMain: boolean;
}

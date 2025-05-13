export interface Card {
	id: number;
	cardName: string;
	name: string;
	phoneNum: string;
	email: string;
	position: string;
	belongTo: string;
	industry: string;
	job: string;

	department?: string;
	imgUrl?: string | null;
	content?: string;
	companyTel?: string;
	color?: string;
	website?: string;

	isMain: boolean;
}

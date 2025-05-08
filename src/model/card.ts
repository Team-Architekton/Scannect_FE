export interface Card {
	id: number;
	name: string;
	title: string;
	company: string;
	phone: string;
	email: string;
	website: string;
	isDefault: boolean;
	industry: string;
	job: string;

	department?: string;
	profileImage?: string | null;
	introduction?: string;
	landline?: string;
	color?: string;
}

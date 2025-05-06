export interface Card {
	id: number;
	name: string;
	title: string;
	company: string;
	department: string;
	phone: string;
	email: string;
	website: string;
	isDefault: boolean;

	profileImage?: string | null;
	introduction?: string;
	landline?: string;
	category?: string;
	color?: string;
};
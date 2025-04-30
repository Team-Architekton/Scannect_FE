export interface IGpsUser {
	id: number;
	name: string;
	job: string;
	company: string;
}

export const dummyData: IGpsUser[] = [
	{
		id: 1,
		name: '김선우',
		job: 'iOS 개발자',
		company: '김컴퍼니',
	},
	{
		id: 2,
		name: '박유진',
		job: '프론트엔드 엔지니어',
		company: '아키텍톤',
	},
	{
		id: 3,
		name: '조영은',
		job: '기획자',
		company: '아키텍톤',
	},
	{
		id: 4,
		name: '이구매',
		job: '구매팀 대리',
		company: '무슨무슨회사',
	},
	{
		id: 5,
		name: '박개발',
		job: '백엔드 인턴',
		company: '무슨무슨회사',
	},
];

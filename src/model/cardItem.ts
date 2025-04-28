export interface ICardItem {
	id: number;
	name: string;
	belong_to?: string;
	department?: string;
	job?: string;
	memo?: string;
	favorite: boolean;
	status: boolean;
	created_at: number;
}

// 임시 더미데이터
export const dummyData = [
	{
		id: 0,
		name: '김누구',
		belong_to: '무슨무슨회사',
		department: '영업부',
		job: '대리',
		memo: '어디서 만났고 어떤 사람인지 메모메모',
		favorite: true,
		status: true,
		created_at: 1745413196729,
	},
	{
		id: 1,
		name: '박개발',
		belong_to: '무슨무슨회사',
		department: '개발부',
		job: '인턴',
		favorite: false,
		status: true,
		created_at: 1745413199809,
	},
	{
		id: 2,
		name: '이구매',
		belong_to: '무슨무슨회사',
		department: '구매팀',
		job: '대리',
		memo: '메모는한줄만보이게 메모는한줄만보이게 메모는한줄만보이게',
		favorite: false,
		status: true,
		created_at: 1745413217276,
	},
	{
		id: 3,
		name: '조팀장',
		belong_to: '무슨무슨회사',
		department: '영업부',
		job: '팀장',
		memo: '메모는 옵션 메모는 옵션 메모는 옵션 메모는 옵션',
		favorite: false,
		status: true,
		created_at: 1745413228456,
	},
	{
		id: 5,
		name: '김예빈',
		belong_to: '한국외대',
		department: '아키텍톤 팀',
		job: '프론트',
		memo: '어디서 만났고 어떤 사람인지 메모메모',
		favorite: false,
		status: false,
		created_at: 1945413229282,
	},
	{
		id: 6,
		name: '박유진',
		belong_to: '한국외대',
		department: '아키텍톤 팀',
		job: '프론트',
		memo: '어디서 만났고 어떤 사람인지 메모메모',
		favorite: false,
		status: false,
		created_at: 1845413254937,
	},
	{
		id: 7,
		name: '김선우',
		belong_to: '한국외대',
		department: '아키텍톤 팀',
		job: '프론트',
		memo: '어디서 만났고 어떤 사람인지 메모메모',
		favorite: false,
		status: false,
		created_at: 1745413255624,
	},
	{
		id: 8,
		name: '김우진',
		belong_to: '한국외대',
		department: '아키텍톤 팀',
		job: '백',
		memo: '어디서 만났고 어떤 사람인지 메모메모',
		favorite: false,
		status: false,
		created_at: 1735413244927,
	},
	{
		id: 9,
		name: '조영은',
		belong_to: '한국외대',
		department: '아키텍톤 팀',
		job: '기획',
		memo: '어디서 만났고 어떤 사람인지 메모메모',
		favorite: false,
		status: false,
		created_at: 1732413255620,
	},
	{
		id: 10,
		name: '김민지',
		belong_to: '한국외대',
		department: '아키텍톤 팀',
		job: '기획',
		memo: '어디서 만났고 어떤 사람인지 메모메모',
		favorite: false,
		status: false,
		created_at: 1731413256210,
	},
];

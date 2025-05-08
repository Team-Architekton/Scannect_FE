export type RootTabParamList = {
	명함리스트: undefined;
	명함교환: undefined;
	마이페이지: undefined;
};

export type CardListStackParamList = {
	'명함 리스트': undefined;
	'명함 상세': { cardId: number }; // 네비게이션 이동 시 params로 cardId를 넘겨받음
};

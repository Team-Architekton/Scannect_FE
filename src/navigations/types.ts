export type RootTabParamList = {
	CardListTab: undefined;
	ExchangeTab: undefined;
	MyPageTab: undefined;
};

export type CardListStackParamList = {
	CardList: undefined;
	CardDetail: { cardId: number };
};

export type AuthStackParamList = {
	로그인: undefined;
	회원가입: undefined;
};

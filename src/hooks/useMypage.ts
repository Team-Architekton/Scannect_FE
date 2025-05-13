import { useEffect } from 'react';
import { useMypageStore } from '../store/useMyPageStore';
import { Card } from '../model/card';

export function useMypage() {
	const { cards, selectedCard, setCards, setSelectedCard } = useMypageStore();

	useEffect(() => {
		const mockData: Card[] = [
			{
				id: 1,
				cardName: '비지니스 1',
				name: '박유진',
				job: '프론트엔드 개발자',
				belongTo: '당근마켓',
				department: '개발팀',
				phoneNum: '010-1234-5678',
				email: 'yujin@daangn.com',
				website: 'https://daangn.com',
				isMain: true,
				imgUrl: 'https://randomuser.me/api/portraits/women/21.jpg',
				content: '안녕하세요! 당근마켓 프론트엔드 개발자 박유진입니다 😊',
				companyTel: '02-123-4567',
				industry: 'IT',
				position: '개발',
			},
			{
				id: 2,
				cardName: '비지니스 1',
				name: '박유진',
				job: '컴퓨터공학 튜터',
				belongTo: '한국외대 AI융합학부',
				department: '학생조교팀',
				phoneNum: '010-1234-5678',
				email: 'yujin@example.com',
				website: 'https://hufs.ac.kr',
				isMain: false,
				industry: 'IT',
				position: '개발',
			},
			{
				id: 3,
				cardName: '비지니스 1',
				name: '박유진',
				job: '운영진',
				belongTo: '멋쟁이사자처럼',
				department: '프론트엔드 파트',
				phoneNum: '010-1234-5678',
				email: 'yujin@example.com',
				website: 'https://likelion.org',
				isMain: false,
				industry: 'IT',
				position: '개발',
			},
			{
				id: 4,
				cardName: '비지니스 1',
				name: '박유진',
				job: '사진 동아리 회원',
				belongTo: 'HUFS SNAP',
				department: '기획팀',
				phoneNum: '010-1234-5678',
				email: 'yujin@example.com',
				website: '',
				isMain: false,
				industry: 'IT',
				position: '개발',
			},
		];

		setCards(mockData);
	}, []);

	const updateCardColor = (cardId: number, color: string) => {
		const updatedCards = cards.map(card => (card.id === cardId ? { ...card, colour: color } : card));
		setCards(updatedCards);

		if (selectedCard?.id === cardId) {
			setSelectedCard({ ...selectedCard, color: color });
		}
	};

	const setDefaultCard = (cardId: number) => {
		const updated = cards.map(card => ({
			...card,
			isMain: card.id === cardId,
		}));
		setCards(updated);
		const newDefault = updated.find(c => c.id === cardId)!;
		setSelectedCard(newDefault);
	};

	const deleteCard = (cardId: number) => {
		const remaining = cards.filter(card => card.id !== cardId);
		setCards(remaining);
		if (selectedCard?.id === cardId) {
			setSelectedCard(remaining[0] ?? null);
		}
	};

	return {
		cards,
		selectedCard,
		setSelectedCard,
		updateCardColor,
		setDefaultCard,
		deleteCard,
	};
}

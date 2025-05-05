import { useEffect } from 'react';
import { useMypageStore } from '../store/myPageStore';
import { Card } from '../model/card';

export function useMypage() {
	const { cards, selectedCard, setCards, setSelectedCard } = useMypageStore();

	useEffect(() => {
		const mockData: Card[] = [
			{
				id: 1,
				name: '박유진',
				title: '프론트엔드 개발자',
				company: '당근마켓',
				department: '개발팀',
				phone: '010-1234-5678',
				email: 'yujin@daangn.com',
				website: 'https://daangn.com',
				isDefault: true,
				profileImage: 'https://example.com/profile.jpg',
				introduction: '안녕하세요! 당근마켓 프론트엔드 개발자 박유진입니다 😊',
				landline: '02-123-4567',
				category: 'IT/개발',
			},
			{
				id: 2,
				name: '박유진',
				title: '컴퓨터공학 튜터',
				company: '한국외대 AI융합학부',
				department: '학생조교팀',
				phone: '010-1234-5678',
				email: 'yujin@example.com',
				website: 'https://hufs.ac.kr',
				isDefault: false,
			},
			{
				id: 3,
				name: '박유진',
				title: '운영진',
				company: '멋쟁이사자처럼',
				department: '프론트엔드 파트',
				phone: '010-1234-5678',
				email: 'yujin@example.com',
				website: 'https://likelion.org',
				isDefault: false,
			},
			{
				id: 4,
				name: '박유진',
				title: '사진 동아리 회원',
				company: 'HUFS SNAP',
				department: '기획팀',
				phone: '010-1234-5678',
				email: 'yujin@example.com',
				website: '',
				isDefault: false,
			},
		];

		setCards(mockData);
	}, []);

	const updateCardColor = (cardId: number, color: string) => {
		const updatedCards = cards.map(card =>
			card.id === cardId ? { ...card, color } : card
		);
		setCards(updatedCards);

		if (selectedCard?.id === cardId) {
			setSelectedCard({ ...selectedCard, color });
		}
	};

	const setDefaultCard = (cardId: number) => {
		const updated = cards.map(card => ({
			...card,
			isDefault: card.id === cardId,
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
};
import { useState, useEffect } from 'react';
import { Card } from '../model/card';

export function useMypage() {
	const [cards, setCards] = useState<Card[]>([]);

	useEffect(() => {
		async function fetchCards() {
			try {
				const mockData: Card[] = [
					{ id: 1, name: 'Business Card 1' },
					{ id: 2, name: 'Business Card 2' },
					{ id: 'new', name: '새 명함 생성' },
				];
				setCards(mockData);
			} catch (error) {
				console.error('Failed to fetch cards:', error);
			}
		}
		fetchCards();
	}, []);

	return { cards };
}

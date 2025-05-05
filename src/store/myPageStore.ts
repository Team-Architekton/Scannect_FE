import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Card } from '../model/card';

interface CardState {
	selectedCard: Card | null;
	setSelectedCard: (card: Card) => void;
}

export const useMypageStore = create<CardState>()(
	persist(
		set => ({
			selectedCard: null,
			setSelectedCard: (card: Card) => set({ selectedCard: card }),
		}),
		{
			name: 'selected-card-storage',
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);

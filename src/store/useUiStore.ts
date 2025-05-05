import { create } from 'zustand';

type UiStore = {
	dropdownOpen: boolean;
	hamburgerOpen: boolean;
	setDropdownOpen: (open: boolean) => void;
	setHamburgerOpen: (open: boolean) => void;
	clearAllPopups: () => void;
};

export const useUiStore = create<UiStore>((set, get) => ({
	dropdownOpen: false,
	hamburgerOpen: false,

	setDropdownOpen: open => {
		if (open) {
			set({ dropdownOpen: true, hamburgerOpen: false });
		} else {
			set({ dropdownOpen: false });
		}
	},

	setHamburgerOpen: open => {
		if (open) {
			set({ hamburgerOpen: true, dropdownOpen: false });
		} else {
			set({ hamburgerOpen: false });
		}
	},

	clearAllPopups: () => {
		const { dropdownOpen, hamburgerOpen } = get();
		if (dropdownOpen || hamburgerOpen) {
			set({ dropdownOpen: false, hamburgerOpen: false });
		}
	},
}));

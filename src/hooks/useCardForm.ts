import { useState } from 'react';
import { Card } from '../model/card';

export type CardForm = Omit<Card, 'id' | 'isDefault'>;
export type CardFormErrors = Partial<Record<keyof CardForm, string>>;

export function useCardForm(initial: Partial<CardForm> = {}) {
	const [form, setForm] = useState<CardForm>({
		name: '',
		phone: '',
		email: '',
		title: '',
		company: '',
		department: '',
		website: '',
		introduction: '',
		landline: '',
		profileImage: '',
		category: '',
		color: '',
		...initial,
	});

	const [errors, setErrors] = useState<CardFormErrors>({});

	const handleChange = (key: keyof CardForm, value: string) => {
		setForm(prev => ({ ...prev, [key]: value }));
		setErrors(prev => ({ ...prev, [key]: undefined }));
	};

	const validateField = (field: keyof CardForm, value: string) => {
		let error = '';
		switch (field) {
			case 'name':
				if (!value.trim()) error = '이름은 필수 입력 항목입니다';
				else if (value.length > 10) error = '이름은 10자 이하로 입력해주세요';
				break;
			case 'email':
				if (!value.trim()) error = '이메일은 필수 입력 항목입니다';
				else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = '올바른 이메일 형식이 아닙니다';
				break;
			case 'phone':
				if (!value.trim()) error = '휴대폰 번호는 필수 입력 항목입니다';
				else if (!/^[0-9\-]+$/.test(value)) error = '전화번호는 숫자와 - 만 입력할 수 있습니다';
				break;
		}
		if (error) {
			setErrors(prev => ({ ...prev, [field]: error }));
		}
	};

	return { form, errors, handleChange, validateField };
};

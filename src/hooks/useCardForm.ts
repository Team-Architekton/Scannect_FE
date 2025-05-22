import { useEffect, useState } from 'react';
import { Card } from '../model/card';

export type CardForm = Omit<Card, 'id' | 'isMain'>;
export type CardFormErrors = Partial<Record<keyof CardForm, string>>;

export function useCardForm(initial: Partial<CardForm> = {}) {
	const DEFAULT_FORM: CardForm = {
		cardName: '',
		name: '',
		phoneNum: '',
		email: '',
		position: '',
		belongTo: '',
		department: '',
		content: '',
		companyTel: '',
		imgUrl: null,
		industry: '',
		job: '',
		color: '',
		website: '',
	};

	const [form, setForm] = useState<CardForm>({
		...DEFAULT_FORM,
		...initial,
	});

	const [errors, setErrors] = useState<CardFormErrors>({});

	useEffect(() => {
		setForm({ ...DEFAULT_FORM, ...initial });
	}, [JSON.stringify(initial)]);

	const resetForm = (newInitial: Partial<CardForm> = initial) => {
		setForm({ ...DEFAULT_FORM, ...newInitial });
		setErrors({});
	};

	const handleChange = (key: keyof CardForm, value: string | null) => {
		setForm(prev => ({ ...prev, [key]: value }));
		setErrors(prev => ({ ...prev, [key]: undefined }));
	};

	const validateField = (field: keyof CardForm, value: string) => {
		let error = '';
		switch (field) {
			case 'cardName':
				if (!value.trim()) error = '명함 별명은 필수 입력 항목입니다';
				else if (value.length > 10) error = '명함 별명은 10자 이하로 입력해주세요';
				break;
			case 'name':
				if (!value.trim()) error = '이름은 필수 입력 항목입니다';
				else if (value.length > 10) error = '이름은 10자 이하로 입력해주세요';
				break;
			case 'belongTo':
				if (!value.trim()) error = '소속은 필수 입력 항목입니다';
				break;
			case 'job':
				if (!value.trim()) error = '직책은 필수 입력 항목입니다';
				break;
			case 'industry':
				if (!value.trim()) error = '업종은 필수 선택 항목입니다';
				break;
			case 'position':
				if (!value.trim()) error = '직무는 필수 선택 항목입니다';
				break;
			case 'email':
				if (!value.trim()) error = '이메일은 필수 입력 항목입니다';
				else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = '올바른 이메일 형식이 아닙니다';
				break;
			case 'phoneNum':
				if (!value.trim()) error = '휴대폰 번호는 필수 입력 항목입니다';
				else if (!/^\d{11}$/.test(value)) error = '전화번호는 숫자만 입력하며 11자리여야 합니다';
				break;
		}
		if (error) {
			setErrors(prev => ({ ...prev, [field]: error }));
		}
		return error;
	};

	return { form, errors, handleChange, validateField, resetForm };
}

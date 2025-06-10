import { View } from 'react-native';
import LabeledInput from './LabeledInput';
import { useCardForm } from '../../hooks/useCardForm';
import { useMypage } from '../../hooks/useMypage';
import CommonButton from '../CommonButton';
import JobSelector from './JobSelector';
import LabeledTextarea from './LabeledTextarea';
import ProfileImagePicker from './Profile';
import spacing from '../../styles/spacing';
import { useMemo } from 'react';

export default function CardCreateForm({ onAnyInputFocus }: { onAnyInputFocus?: () => void }) {
	const emptyInitial = useMemo(() => ({}), []);
	const { form, errors, handleChange, validateField } = useCardForm(emptyInitial);
	const { createCard } = useMypage();

	const requiredFields: (keyof typeof form)[] = [
		'cardName',
		'nickname',
		'belongTo',
		'job',
		'industry',
		'position',
		'email',
		'phoneNum',
	];

	const handleCreate = () => {
		let hasError = false;

		requiredFields.forEach(field => {
			const value = form[field];
			if (typeof value === 'string') {
				const error = validateField(field, value);
				if (error) {
					hasError = true;
				}
			}
		});

		if (!hasError) {
			createCard(form);
		}
	};

	return (
		<>
			<ProfileImagePicker
				imageUri={form.imgUrl ?? null}
				onChange={uri => handleChange('imgUrl', uri)}
			/>
			<LabeledTextarea
				label="자기소개"
				value={form.content ?? ''}
				onChangeText={text => handleChange('content', text)}
				placeholder="자기소개를 입력하세요"
				errorMessage={errors.content}
			/>
			<LabeledInput
				label="명함 별명"
				required
				value={form.cardName}
				onChangeText={text => handleChange('cardName', text)}
				errorMessage={errors.cardName}
				placeholder="명함 별명을 입력하세요"
				onBlur={() => validateField('cardName', form.cardName)}
			/>
			<LabeledInput
				label="이름"
				required
				value={form.nickname}
				onChangeText={text => handleChange('nickname', text)}
				errorMessage={errors.nickname}
				placeholder="이름을 입력하세요"
				onBlur={() => validateField('nickname', form.nickname)}
			/>
			<LabeledInput
				label="소속"
				required
				value={form.belongTo}
				onChangeText={text => handleChange('belongTo', text)}
				errorMessage={errors.belongTo}
				placeholder="소속 이름을 입력하세요"
				onBlur={() => validateField('belongTo', form.belongTo)}
			/>
			<LabeledInput
				label="직책"
				required
				value={form.job}
				onChangeText={text => handleChange('job', text)}
				errorMessage={errors.job}
				placeholder="직책을 입력하세요"
				onBlur={() => validateField('job', form.job)}
			/>
			<LabeledInput
				label="부서"
				value={form.department}
				onChangeText={text => handleChange('department', text)}
				placeholder="부서를 입력하세요"
			/>
			<JobSelector
				industry={form.industry}
				position={form.position}
				onChangeIndustry={value => handleChange('industry', value)}
				onChangePosition={value => handleChange('position', value)}
				industryError={errors.industry}
				positionError={errors.position}
			/>
			<LabeledInput
				label="휴대폰"
				required
				value={form.phoneNum}
				onChangeText={text => handleChange('phoneNum', text)}
				errorMessage={errors.phoneNum}
				placeholder="01012345678 (- 제외)"
				keyboardType="phone-pad"
				onBlur={() => validateField('phoneNum', form.phoneNum)}
			/>
			<LabeledInput
				label="유선전화"
				value={form.companyTel}
				onChangeText={text => handleChange('companyTel', text)}
				placeholder="02-1234-5678"
				keyboardType="phone-pad"
			/>
			<LabeledInput
				label="이메일"
				required
				value={form.email}
				onChangeText={text => handleChange('email', text)}
				errorMessage={errors.email}
				placeholder="example@domain.com"
				keyboardType="email-address"
				onBlur={() => validateField('email', form.email)}
			/>
			<LabeledInput
				label="URL"
				value={form.url}
				onChangeText={text => handleChange('url', text)}
				placeholder="https://"
				keyboardType="url"
			/>
			<View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: spacing.s }}>
				<CommonButton title="취소" onPress={() => {}} size="small" />
				<CommonButton title="생성" onPress={() => handleCreate()} size="small" />
			</View>
		</>
	);
}

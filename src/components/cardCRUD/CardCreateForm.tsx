import LabeledInput from '../../components/cardCRUD/LabeledInput';
import { useCardForm } from '../../hooks/useCardForm';
import JobSelector from './JobSelector';
import LabeledTextarea from './LabeledTextarea';
import ProfileImagePicker from './Profile';

export default function CardCreateForm() {
	const { form, errors, handleChange, validateField } = useCardForm();

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
				label="이름"
				required
				value={form.cardName}
				onChangeText={text => handleChange('cardName', text)}
				errorMessage={errors.cardName}
				placeholder="이름을 입력하세요"
				onBlur={() => validateField('cardName', form.cardName)}
			/>
			<LabeledInput
				label="소속"
				required
				value={form.belongTo}
				onChangeText={text => handleChange('belongTo', text)}
				errorMessage={errors.belongTo}
				placeholder="회사 이름을 입력하세요"
			/>
			<LabeledInput
				label="직책"
				required
				value={form.job}
				onChangeText={text => handleChange('job', text)}
				errorMessage={errors.job}
				placeholder="직책을 입력하세요"
			/>
			<LabeledInput
				label="부서"
				value={form.department}
				onChangeText={text => handleChange('department', text)}
				placeholder="부서를 입력하세요"
			/>
			<JobSelector
				industry={form.industry}
				job={form.position}
				onChangeIndustry={value => handleChange('industry', value)}
				onChangeJob={value => handleChange('position', value)}
			/>
			<LabeledInput
				label="휴대폰"
				required
				value={form.phoneNum}
				onChangeText={text => handleChange('phoneNum', text)}
				errorMessage={errors.phoneNum}
				placeholder="010-1234-5678"
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
			{/* <LabeledInput
				label="URL"
				value={form.website}
				onChangeText={text => handleChange('website', text)}
				placeholder="https://"
				keyboardType="url"
			/> */}
		</>
	);
};

import LabeledInput from '../../components/cardCRUD/LabeledInput';
import { useCardForm } from '../../hooks/useCardForm';
import LabeledTextarea from './LabeledTextarea';
import ProfileImagePicker from './Profile';

export default function CardCreateForm() {
	const { form, errors, handleChange, validateField } = useCardForm();

	return (
		<>
            <ProfileImagePicker
                imageUri={form.profileImage ?? null}
                onChange={uri => handleChange('profileImage', uri)}
            />
			<LabeledTextarea
				label="자기소개"
				value={form.introduction ?? ''}
				onChangeText={text => handleChange('introduction', text)}
				placeholder="자기소개를 입력하세요"
				errorMessage={errors.introduction}
			/>
			<LabeledInput
				label="이름"
				required
				value={form.name}
				onChangeText={text => handleChange('name', text)}
				errorMessage={errors.name}
				placeholder="이름을 입력하세요"
                onBlur={() => validateField('name', form.name)}
			/>
			<LabeledInput
				label="소속"
				required
				value={form.company}
				onChangeText={text => handleChange('company', text)}
				errorMessage={errors.company}
				placeholder="회사 이름을 입력하세요"
			/>
			<LabeledInput
				label="직책"
				required
				value={form.title}
				onChangeText={text => handleChange('title', text)}
				errorMessage={errors.title}
				placeholder="직책을 입력하세요"
			/>
			<LabeledInput
				label="부서"
				value={form.department}
				onChangeText={text => handleChange('department', text)}
				placeholder="부서를 입력하세요"
			/>
			<LabeledInput
				label="휴대폰"
				required
				value={form.phone}
				onChangeText={text => handleChange('phone', text)}
				errorMessage={errors.phone}
				placeholder="010-1234-5678"
				keyboardType="phone-pad"
                onBlur={() => validateField('phone', form.phone)}
			/>
			<LabeledInput
				label="유선전화"
				value={form.landline}
				onChangeText={text => handleChange('landline', text)}
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
				value={form.website}
				onChangeText={text => handleChange('website', text)}
				placeholder="https://"
				keyboardType="url"
			/>
		</>
	);
}

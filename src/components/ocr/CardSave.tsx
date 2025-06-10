import { View, ScrollView, Alert } from 'react-native';
import { CardForm, useCardForm } from '../../hooks/useCardForm';
import LabeledInput from '../cardCreateUpdate/LabeledInput';
import CommonButton from '../CommonButton';
import LabeledTextarea from '../cardCreateUpdate/LabeledTextarea';
import JobSelector from '../cardCreateUpdate/JobSelector';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { useOCR } from '../../hooks/useOCR';

interface Props {
	initialData: Partial<CardForm>;
}

export default function CardSave({ initialData }: Props) {
	const { form, errors, handleChange, validateField, resetForm } = useCardForm(initialData);
	const { saveOCRCard } = useOCR();
	const navigation = useNavigation<any>();

	const handleSave = async () => {
		let hasError = false;

		const requiredFields: (keyof typeof form)[] = [
			'nickname',
			'belongTo',
			'job',
			'industry',
			'position',
			'email',
			'phoneNum',
		];

		requiredFields.forEach(field => {
			const value = form[field];
			if (typeof value === 'string') {
				const error = validateField(field, value);
				if (error) {
					hasError = true;
				}
			}
		});

		if (hasError) return;

		try {
			const response = await saveOCRCard(form);
			if (response?.success) {
				const cardId = response.data.cardId;
				Toast.show({
					type: 'success',
					text1: response.message || '명함이 저장되었습니다.',
					position: 'bottom',
				});
				resetForm();

				console.log(cardId);

				navigation.pop();
				navigation.navigate('CardListTab', { screen: 'CardDetail', params: { cardId } });
			} else {
				Toast.show({
					type: 'error',
					text1: response?.message || '명함 저장에 실패했습니다.',
					position: 'bottom',
				});
			}
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: '명함 저장 중 오류가 발생했습니다.',
				position: 'bottom',
			});
		}
	};

	const handleCancel = () => {
		Alert.alert(
			'작성 취소',
			'입력한 내용이 모두 삭제됩니다. 취소하시겠습니까?',
			[
				{
					text: '아니요',
					style: 'cancel',
				},
				{
					text: '네',
					style: 'destructive',
					onPress: () => {
						resetForm();
						navigation.goBack();
					},
				},
			],
			{ cancelable: true }
		);
	};

	return (
		<ScrollView contentContainerStyle={{ padding: 16 }}>
			<LabeledInput
				label="이름"
				required
				value={form.nickname ?? ''}
				onChangeText={text => handleChange('nickname', text)}
				placeholder="이름을 입력하세요"
				onBlur={() => validateField('nickname', form.nickname ?? '')}
				errorMessage={errors.nickname}
			/>
			<LabeledInput
				label="소속"
				required
				value={form.belongTo ?? ''}
				onChangeText={text => handleChange('belongTo', text)}
				onBlur={() => validateField('belongTo', form.belongTo ?? '')}
				placeholder="소속 이름을 입력하세요"
				errorMessage={errors.belongTo}
			/>
			<LabeledInput
				label="직책"
				required
				value={form.job ?? ''}
				onChangeText={text => handleChange('job', text)}
				errorMessage={errors.job}
				placeholder="직책을 입력하세요"
				onBlur={() => validateField('job', form.job ?? '')}
			/>
			<LabeledInput
				label="부서"
				value={form.department ?? ''}
				onChangeText={text => handleChange('department', text)}
				placeholder="부서를 입력하세요"
			/>
			<JobSelector
				industry={form.industry ?? ''}
				position={form.position ?? ''}
				onChangeIndustry={value => handleChange('industry', value)}
				onChangePosition={value => handleChange('position', value)}
				industryError={errors.industry}
				positionError={errors.position}
			/>
			<LabeledInput
				label="휴대폰"
				required
				value={form.phoneNum ?? ''}
				onChangeText={text => handleChange('phoneNum', text)}
				placeholder="01012345678 (- 제외)"
				keyboardType="phone-pad"
				onBlur={() => validateField('phoneNum', form.phoneNum ?? '')}
				errorMessage={errors.phoneNum}
			/>
			<LabeledInput
				label="유선전화"
				value={form.companyTel ?? ''}
				onChangeText={text => handleChange('companyTel', text)}
				placeholder="02-1234-5678"
				keyboardType="phone-pad"
			/>
			<LabeledInput
				label="이메일"
				required
				value={form.email ?? ''}
				onChangeText={text => handleChange('email', text)}
				onBlur={() => validateField('email', form.email ?? '')}
				placeholder="example@domain.com"
				errorMessage={errors.email}
				keyboardType="email-address"
				autoCapitalize="none"
			/>
			<LabeledInput
				label="URL"
				value={form.url}
				onChangeText={text => handleChange('url', text)}
				placeholder="https://"
				keyboardType="url"
			/>
			<LabeledTextarea
				label="메모"
				value={form.content ?? ''}
				onChangeText={text => handleChange('content', text)}
				placeholder="상대방에 대한 메모를 입력하세요"
				errorMessage={errors.content}
			/>

			<View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginTop: 24 }}>
				<CommonButton title="취소" onPress={handleCancel} size="small" />
				<CommonButton title="명함 저장" onPress={handleSave} size="small" />
			</View>
		</ScrollView>
	);
}

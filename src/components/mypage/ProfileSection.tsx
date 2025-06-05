import { Alert, View } from 'react-native';
import ProfileIntro from './elements/ProfileIntro';
import InfoSection from './elements/InfoSection';
import { useMypageStore } from '../../store/useMyPageStore';
import { CardForm, useCardForm } from '../../hooks/useCardForm';
import CommonButton from '../CommonButton';
import { useMypage } from '../../hooks/useMypage';
import { Card } from '../../model/card';
import { useMemo } from 'react';

type ProfileSectionProps = {
	selectedCard: Card | null;
};

export default function ProfileSection({ selectedCard }: ProfileSectionProps) {
	const setIsEditing = useMypageStore(state => state.setIsEditing);
	const isEditing = useMypageStore(state => state.isEditing);
	const { updateCard } = useMypage();

	const memoizedInitial = useMemo(() => ({ ...(selectedCard ?? {}) }), [selectedCard]);
	const { form, errors, handleChange, validateField, resetForm } = useCardForm(memoizedInitial);

	const validateAll = () => {
		const requiredFields: (keyof CardForm)[] = [
			'nickname',
			'belongTo',
			'industry',
			'position',
			'email',
			'phoneNum',
		];
		return !requiredFields.some(field => validateField(field, form[field] ?? ''));
	};

	const handleSave = () => {
		if (!selectedCard || !validateAll()) return;

		Alert.alert(
			'수정 저장',
			'수정한 내용을 저장하시겠습니까?',
			[
				{ text: '취소', style: 'cancel' },
				{
					text: '저장',
					onPress: () => {
						updateCard(selectedCard.id, form);
						setIsEditing(false);
					},
				},
			],
			{ cancelable: true }
		);
	};

	const handleCancel = () => {
		if (!selectedCard) return;

		Alert.alert(
			'수정 취소',
			'지금까지 수정한 내용이 사라집니다. 취소하시겠습니까?',
			[
				{ text: '아니요', style: 'cancel' },
				{
					text: '네',
					style: 'destructive',
					onPress: () => {
						resetForm(selectedCard);
						setIsEditing(false);
					},
				},
			],
			{ cancelable: true }
		);
	};

	return (
		<View>
			<ProfileIntro
				content={form.content ?? ''}
				imgUrl={form.imgUrl ?? null}
				onChangeContent={text => handleChange('content', text)}
				onChangeImg={uri => handleChange('imgUrl', uri)}
				isEditing={isEditing}
			/>
			<InfoSection
				form={form}
				errors={errors}
				isEditing={isEditing}
				handleChange={handleChange}
				validateField={validateField}
			/>
			{isEditing && (
				<View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
					<CommonButton title="취소" onPress={handleCancel} size="small" />
					<CommonButton title="저장" onPress={handleSave} size="small" />
				</View>
			)}
		</View>
	);
}

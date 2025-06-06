import CardPreview from '../mypage/CardPreview';
import Contacts from './Contacts';
import ProfileIntro from '../mypage/elements/ProfileIntro';
import InfoSection from '../mypage/elements/InfoSection';
import { useCardForm } from '../../hooks/useCardForm';
import { ICardItem } from '../../model/cardItem';

export default function ProfileInfo({ card }: { card: ICardItem }) {
	const { form, errors } = useCardForm({ ...card });

	return (
		<>
			<CardPreview selectedCard={card} />
			<Contacts phoneNum={card.phoneNum} email={card.email} />

			<ProfileIntro
				content={card.content ?? ''}
				imgUrl={card.imgUrl ?? null}
				onChangeContent={text => {}}
				onChangeImg={uri => {}}
				isEditing={false}
			/>
			<InfoSection
				form={form}
				errors={errors}
				isEditing={false}
				handleChange={(key, value) => {}}
				validateField={(key, value) => {}}
			/>
		</>
	);
}

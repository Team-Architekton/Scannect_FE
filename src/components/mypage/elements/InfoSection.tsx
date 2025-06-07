import { View, Text, StyleSheet } from 'react-native';
import spacing from '../../../styles/spacing';
import colors from '../../../styles/Colors';
import typography from '../../../styles/typography';
import EditableField from '../../cardCreateUpdate/EditableField';
import JobSelector from '../../cardCreateUpdate/JobSelector';
import { CardForm, CardFormErrors, useCardForm } from '../../../hooks/useCardForm';

type Props = {
	form: CardForm;
	errors: CardFormErrors;
	isEditing: boolean;
	handleChange: (key: keyof CardForm, value: string | null) => void;
	validateField: (key: keyof CardForm, value: string) => void;
};

export default function InfoSection({
	form,
	errors,
	isEditing,
	handleChange,
	validateField,
}: Props) {
	return (
		<View style={styles.container}>
			<Text style={[typography.h2, styles.sectionTitle]}>명함 정보</Text>
			<View style={styles.divider} />

			<EditableField
				label="이름"
				value={form.nickname}
				onChange={text => handleChange('nickname', text)}
				isEditing={isEditing}
				inputProps={{ onBlur: () => validateField('nickname', form.nickname) }}
				errorMessage={errors.nickname}
			/>

			<EditableField
				label="소속"
				value={form.belongTo}
				onChange={text => handleChange('belongTo', text)}
				isEditing={isEditing}
				inputProps={{ onBlur: () => validateField('belongTo', form.belongTo) }}
				errorMessage={errors.belongTo}
			/>

			<EditableField
				label="부서"
				value={form.department}
				onChange={text => handleChange('department', text)}
				isEditing={isEditing}
			/>

			<EditableField
				label="직책"
				value={form.job}
				onChange={text => handleChange('job', text)}
				isEditing={isEditing}
				inputProps={{ onBlur: () => validateField('job', form.job) }}
				errorMessage={errors.job}
			/>

			{isEditing ? (
				<>
					<Text style={styles.label}>업종/직무</Text>
					<JobSelector
						industry={form.industry}
						position={form.position}
						onChangeIndustry={value => handleChange('industry', value)}
						onChangePosition={value => handleChange('position', value)}
						industryError={errors.industry}
						positionError={errors.position}
						showLabel={false}
					/>
				</>
			) : (
				<View style={styles.infoRow}>
					<Text style={styles.label}>업종/직무</Text>
					<Text style={styles.value}>
						{form.industry}/{form.position}
					</Text>
				</View>
			)}

			<Text style={[typography.h2, styles.sectionTitle]}>연락처</Text>
			<View style={styles.divider} />

			<EditableField
				label="휴대폰"
				value={form.phoneNum}
				onChange={text => handleChange('phoneNum', text)}
				isEditing={isEditing}
				inputProps={{ onBlur: () => validateField('phoneNum', form.phoneNum) }}
				errorMessage={errors.phoneNum}
			/>

			<EditableField
				label="유선전화"
				value={form.companyTel}
				onChange={text => handleChange('companyTel', text)}
				isEditing={isEditing}
			/>

			<EditableField
				label="이메일"
				value={form.email}
				onChange={text => handleChange('email', text)}
				isEditing={isEditing}
				inputProps={{ onBlur: () => validateField('email', form.email) }}
				errorMessage={errors.email}
			/>

			<EditableField
				label="URL"
				value={form.website}
				onChange={text => handleChange('website', text)}
				isEditing={isEditing}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		padding: spacing.m,
		borderRadius: 12,
		gap: spacing.s,
	},
	sectionTitle: {
		marginTop: spacing.l,
		marginBottom: spacing.xs,
	},
	divider: {
		height: 2,
		backgroundColor: colors.grayscaleGray3,
		marginBottom: spacing.s,
	},
	infoRow: {
		flexDirection: 'row',
		gap: 20,
		marginBottom: spacing.s,
	},
	label: {
		fontSize: 14,
		color: colors.grayscaleGray5,
	},
	value: {
		fontSize: 14,
		color: colors.black,
	},
	buttonRow: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 10,
		marginTop: 16,
	},
});

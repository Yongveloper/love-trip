import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { IHotel, ReservationForm } from '~/models/hotel';

import FixedBottomButton from '../shared/FixedBottomButton';
import Select from '../shared/Select';
import Spacing from '../shared/Spacing';
import Text from '../shared/Text';
import TextField from '../shared/TextField';

function Form({
	forms,
	onSubmit,
	buttonLabel,
}: {
	forms: IHotel['forms'];
	onSubmit: () => void;
	buttonLabel: string;
}) {
	const { register, formState, handleSubmit } = useForm({ mode: 'onBlur' });

	const component = useCallback(
		(form: ReservationForm) => {
			if (form.type === 'TEXT_FIELD') {
				return (
					<TextField
						label={form.label}
						helpMessage={
							(formState.errors[form.id]?.message as string) || form.helpMessage
						}
						hasError={formState.errors[form.id] !== undefined}
						{...register(form.id, {
							required: form.required,
							pattern: VALIDATION_MESSAGE_MAP[form.id],
						})}
					/>
				);
			} else if (form.type === 'SELECT') {
				return (
					<Select
						label={form.label}
						options={form.options}
						// hasError={formState.errors[form.id] !== undefined}
						{...register(form.id, {
							required: form.required,
						})}
					/>
				);
			} else {
				return null;
			}
		},
		[register, formState.errors],
	);

	return (
		<div style={{ padding: '24px' }}>
			<Text bold={true}>예약정보</Text>

			<form>
				{forms.map((form) => {
					return <>{component(form)}</>;
				})}
			</form>

			<Spacing size={80} />

			<FixedBottomButton label={buttonLabel} onClick={handleSubmit(onSubmit)} />
		</div>
	);
}

const VALIDATION_MESSAGE_MAP: {
	[key: string]: {
		value: RegExp;
		message: string;
	};
} = {
	name: {
		value: /^[가-힣]+$/,
		message: '한글명을 확인해주세요.',
	},
	email: {
		value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
		message: '이메일 형식을 확인해주세요.',
	},
	phone: {
		value: /^\d{3}-\d{3,4}-\d{4}$/,
		message: '휴대전화번호를 확인해주세요.',
	},
};

export default Form;

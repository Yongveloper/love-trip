import {
	FocusEventHandler,
	InputHTMLAttributes,
	forwardRef,
	useState,
} from 'react';

import Input from './Input';
import Text from './Text';

interface ITextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: React.ReactNode;
	hasError?: boolean;
	helpMessage?: React.ReactNode;
}

const TextField = forwardRef<HTMLInputElement, ITextFieldProps>(
	function TextField(
		{ label, hasError, helpMessage, onFocus, onBlur, ...props },
		ref,
	) {
		const [focused, setFocused] = useState(false);

		const labelColor = hasError ? 'red' : focused ? 'blue' : undefined;

		const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
			setFocused(true);
			onFocus?.(event);
		};

		const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
			setFocused(false);
			onBlur?.(event);
		};

		return (
			<div>
				{label && (
					<Text
						typography="t7"
						color={labelColor}
						display="inline-block"
						style={{ marginBottom: 6 }}
					>
						{label}
					</Text>
				)}
				<Input
					ref={ref}
					aria-invalid={hasError}
					onFocus={handleFocus}
					onBlur={handleBlur}
					{...props}
				/>

				{/* 동적으로 생기는 요소가 margin을 가질 수 있도록 함.  */}
				{/* input은 margin이 없을 수도 잇기 때문에 디자인이 틀어질 수 있음*/}
				{helpMessage && (
					<Text
						typography="t7"
						color={labelColor}
						style={{ marginTop: 6, fontSize: 12 }}
					>
						{helpMessage}
					</Text>
				)}
			</div>
		);
	},
);

export default TextField;

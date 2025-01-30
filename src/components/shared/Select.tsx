import { SelectHTMLAttributes, forwardRef } from 'react';

import styled from '@emotion/styled';

import { colors } from '~/styles/colorPalette';

import Flex from './Flex';
import Text from './Text';

export interface IOption {
	label: string;
	value: string | number | undefined;
}

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	options: IOption[];
	placeholder?: string;
}

const BaseSelect = styled.select`
	height: 52px;
	background-color: ${colors.gray};
	border: none;
	border-radius: 16px;
	padding: 0 16px;
	cursor: pointer;

	&:required:invalid {
		color: #c0c4c7;
	}
`;

const Select = forwardRef<HTMLSelectElement, ISelectProps>(function Select(
	{ label, options, placeholder, value, ...props },
	ref,
) {
	return (
		<Flex direction="column">
			{label && (
				<Text
					typography="t7"
					color="black"
					display="inline-block"
					style={{ marginBottom: 6 }}
				>
					{label}
				</Text>
			)}
			<BaseSelect required={true} ref={ref} value={value} {...props}>
				<option disabled={true} value="">
					{placeholder}
				</option>
				{options.map(({ label, value }) => (
					<option key={label} value={value}>
						{label}
					</option>
				))}
			</BaseSelect>
		</Flex>
	);
});

export default Select;

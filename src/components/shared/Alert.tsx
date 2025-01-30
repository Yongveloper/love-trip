import React from 'react';

import styled from '@emotion/styled';

import { colors } from '~/styles/colorPalette';

import Button from './Button';
import Dimmed from './Dimmed';
import Flex from './Flex';
import Text from './Text';

interface IAlertProps {
	open?: boolean;
	title: React.ReactNode;
	description?: React.ReactNode;
	buttonLabel?: string;
	onButtonClick: () => void;
}

function Alert({
	open,
	title,
	description,
	buttonLabel = '확인',
	onButtonClick,
}: IAlertProps) {
	if (!open) {
		return null;
	}

	return (
		<Dimmed>
			<AlertContainer>
				<Text
					typography="t4"
					bold={true}
					display="block"
					style={{ marginBottom: 6 }}
				>
					{title}
				</Text>
				{description && <Text typography="t7">{description}</Text>}
				<Flex justify="flex-end">
					<Button
						onClick={onButtonClick}
						weak={true}
						style={{ marginTop: 12, border: 'none' }}
					>
						{buttonLabel}
					</Button>
				</Flex>
			</AlertContainer>
		</Dimmed>
	);
}

const AlertContainer = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background-color: ${colors.white};
	border-radius: 8px;
	overflow: hidden;
	z-index: var(--alert-zindex);
	width: 320px;
	padding: 24px;
	box-sizing: border-box;
`;

export default Alert;

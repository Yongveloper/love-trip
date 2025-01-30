import { createPortal } from 'react-dom';

import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { colors } from '~/styles/colorPalette';

import Button from './Button';

interface IFixedBottomButtonProps {
	label: string;
	onClick: () => void;
	disabled?: boolean;
}

function FixedBottomButton({
	label,
	onClick,
	disabled,
}: IFixedBottomButtonProps) {
	const $portalRoot = document.getElementById('root-portal');

	if (!$portalRoot) {
		return null;
	}

	return createPortal(
		<Container>
			<Button
				size="medium"
				disabled={disabled}
				full={true}
				onClick={onClick}
				css={buttonStyles}
			>
				{label}
			</Button>
		</Container>,
		$portalRoot,
	);
}

const slideUp = keyframes`
  to {
    transform: translateY(0);
  }
`;

const Container = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	/* background-color: ${colors.white}; */
	background-color: transparent;
	padding: 20px 10px 12px;
	transform: translateY(100%);
	animation: ${slideUp} 0.5s ease-in-out forwards;
`;

const buttonStyles = css`
	border-radius: 8px;
`;

export default FixedBottomButton;

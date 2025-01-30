import { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { css } from '@emotion/react';

import { colors } from '~/styles/colorPalette';

import Button from './Button';
import Flex from './Flex';

function Navbar() {
	const location = useLocation();
	const showSignButton = !['/signup', '/signin'].includes(location.pathname);

	// @TODO
	const user = null;

	const renderButton = useCallback(() => {
		if (user) {
			return (
				<Link to="/my">
					{/* @TODO */}
					<img src="" alt="" />
				</Link>
			);
		}

		if (showSignButton) {
			return (
				<Link to="/signin">
					<Button>로그인/회원가입</Button>
				</Link>
			);
		}

		return null;
	}, [user, showSignButton]);

	return (
		<Flex justify="space-between" align="center" css={navbarContainerStyles}>
			<Link to="/">홈</Link>
			{renderButton()}
		</Flex>
	);
}

const navbarContainerStyles = css`
	position: sticky;
	top: 0;
	background-color: ${colors.white};
	border-bottom: 1px solid ${colors.gray};
	padding: 10px 24px;
	z-index: 10;
`;

export default Navbar;

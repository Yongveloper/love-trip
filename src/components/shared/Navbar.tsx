import { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { css } from '@emotion/react';

import { useUser } from '~/hooks/auth/useUser';
import { colors } from '~/styles/colorPalette';

import Button from './Button';
import Flex from './Flex';
import Spacing from './Spacing';

function Navbar() {
	const location = useLocation();
	const showSignButton = !['/signup', '/signin'].includes(location.pathname);

	const user = useUser();

	const renderButton = useCallback(() => {
		if (user) {
			return (
				<Flex align="center">
					<Link to="/my">
						<img
							src={
								user.photoURL ??
								'https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user2-1024.png'
							}
							alt="유저 프로필 이미지"
							width={40}
							height={40}
							style={{ borderRadius: '100%' }}
							onError={console.error}
						/>
					</Link>
					<Spacing size={4} direction="horizontal" />
					<Link to="/settings">
						<img
							src="https://cdn1.iconfinder.com/data/icons/ionicons-outline-vol-2/512/settings-outline-512.png"
							alt="유저 프로필 이미지"
							width={40}
							height={40}
							style={{ borderRadius: '100%' }}
							onError={(e) => console.error(e)}
						/>
					</Link>
				</Flex>
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
			<Link to="/">Love Trip</Link>
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

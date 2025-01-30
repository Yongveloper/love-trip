import { css } from '@emotion/react';

import Flex from './Flex';
import Text from './Text';

interface ITopProps {
	title: string;
	subtitle: string;
}

function Top({ title, subtitle }: ITopProps) {
	return (
		<Flex direction="column" css={containerStyles}>
			<Text bold={true} typography="t4">
				{title}
			</Text>
			<Text typography="t7">{subtitle}</Text>
		</Flex>
	);
}

const containerStyles = css`
	padding: 24px;
`;

export default Top;

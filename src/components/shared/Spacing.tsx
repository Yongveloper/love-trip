import styled from '@emotion/styled';

import { Colors, colors } from '~/styles/colorPalette';

interface ISpacingProps {
	size: number;
	direction?: 'vertical' | 'horizontal';
	backgroundColor?: Colors;
}

const Spacing = styled.div<ISpacingProps>`
	${({ size, direction = 'vertical' }) =>
		direction === 'vertical' ? `height: ${size}px` : `width: ${size}px`};

	${({ backgroundColor }) =>
		backgroundColor && `background-color: ${colors[backgroundColor]}`};
`;

export default Spacing;

import styled from '@emotion/styled';

interface ISpacingProps {
	size: number;
	direction?: 'vertical' | 'horizontal';
}

const Spacing = styled.div<ISpacingProps>`
	${({ size, direction = 'vertical' }) =>
		direction === 'vertical' ? `height: ${size}px` : `width: ${size}px`}
`;

export default Spacing;

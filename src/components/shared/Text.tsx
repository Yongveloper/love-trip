import { CSSProperties } from 'react';

import styled from '@emotion/styled';

import { Colors, colors } from '~/styles/colorPalette';
import { TypoGraphy, typographyMap } from '~/styles/typography';

interface ITextProps {
	typography?: TypoGraphy;
	color?: Colors;
	display?: CSSProperties['display'];
	textAlign?: CSSProperties['textAlign'];
	fontWeight?: CSSProperties['fontWeight'];
	bold?: boolean;
}

const Text = styled.span<ITextProps>(
	({ color = 'black', display, textAlign, fontWeight, bold }) => ({
		color: colors[color],
		display,
		textAlign,
		fontWeight: bold ? 'bold' : fontWeight,
	}),
	({ typography = 't5' }) => typographyMap[typography],
);

export default Text;

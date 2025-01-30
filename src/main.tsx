import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import App from './App.tsx';
import './index.css';

const Container = styled.div`
	color: pink;
`;

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
		<Container>Hello</Container>
		<h2
			css={css`
				color: pink;
			`}
		>
			React
		</h2>
	</StrictMode>,
);

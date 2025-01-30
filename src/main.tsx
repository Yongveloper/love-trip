import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Global } from '@emotion/react';

import App from './App.tsx';
import globalStyles from './styles/globalStyles';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Global styles={globalStyles} />
		<App />
	</StrictMode>,
);

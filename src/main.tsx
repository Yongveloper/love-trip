import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Global } from '@emotion/react';

import App from './App.tsx';
import globalStyles from './styles/globalStyles';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
		},
	},
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Global styles={globalStyles} />
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</StrictMode>,
);

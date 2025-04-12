import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
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
			<Toaster position="top-center" reverseOrder={false} />
		</QueryClientProvider>
	</StrictMode>,
);

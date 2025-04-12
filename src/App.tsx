import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useLoadKakao } from './hooks/useLoadKakao';
import HotelPage from './pages/Hotel';
import HotelListPage from './pages/HotelList';
import TestPage from './pages/Test';

function App() {
	useLoadKakao();

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HotelListPage />} />
				<Route path="/hotel/:id" element={<HotelPage />} />
				<Route path="/test" element={<TestPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

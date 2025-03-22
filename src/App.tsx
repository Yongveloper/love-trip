import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HotelPage from './pages/Hotel';
import HotelListPage from './pages/HotelList';
import TestPage from './pages/Test';

function App() {
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

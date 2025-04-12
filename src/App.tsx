import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthGuard from './components/auth/AuthGuard';
import Navbar from './components/shared/Navbar';
import { useLoadKakao } from './hooks/useLoadKakao';
import HotelPage from './pages/Hotel';
import HotelListPage from './pages/HotelList';
import MyPage from './pages/My';
import SigninPage from './pages/Signin';
import TestPage from './pages/Test';

function App() {
	useLoadKakao();

	return (
		<BrowserRouter>
			<AuthGuard>
				<Navbar />
				<Routes>
					<Route path="/" element={<HotelListPage />} />
					<Route path="/hotel/:id" element={<HotelPage />} />
					<Route path="/signin" element={<SigninPage />} />
					<Route path="/my" element={<MyPage />} />
					<Route path="/test" element={<TestPage />} />
				</Routes>
			</AuthGuard>
		</BrowserRouter>
	);
}

export default App;

import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthGuard from './components/auth/AuthGuard';
import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './components/shared/Navbar';
import { useLoadKakao } from './hooks/useLoadKakao';

const HotelListPage = lazy(() => import('./pages/HotelList'));
const HotelPage = lazy(() => import('./pages/Hotel'));
const MyPage = lazy(() => import('./pages/My'));
const ReservationPage = lazy(() => import('./pages/Reservation'));
const ReservationDonePage = lazy(() => import('./pages/ReservationDone'));
const ReservationListPage = lazy(() => import('./pages/ReservationList'));
const SchedulePage = lazy(() => import('./pages/Schedule'));
const SigninPage = lazy(() => import('./pages/Signin'));
const TestPage = lazy(() => import('./pages/Test'));
const SettingsPage = lazy(() => import('./pages/settings'));
const LikePage = lazy(() => import('./pages/settings/like'));

function App() {
	useLoadKakao();

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<BrowserRouter>
				<AuthGuard>
					<Navbar />
					<Routes>
						<Route path="/" element={<HotelListPage />} />
						<Route path="/hotel/:id" element={<HotelPage />} />
						<Route
							path="/my"
							element={
								<PrivateRoute>
									<MyPage />
								</PrivateRoute>
							}
						/>
						<Route path="/signin" element={<SigninPage />} />
						<Route
							path="/settings"
							element={
								<PrivateRoute>
									<SettingsPage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/settings/like"
							element={
								<PrivateRoute>
									<LikePage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/schedule"
							element={
								<PrivateRoute>
									<SchedulePage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/reservation"
							element={
								<PrivateRoute>
									<ReservationPage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/reservation/done"
							element={
								<PrivateRoute>
									<ReservationDonePage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/reservation/list"
							element={
								<PrivateRoute>
									<ReservationListPage />
								</PrivateRoute>
							}
						/>
						<Route path="/test" element={<TestPage />} />
					</Routes>
				</AuthGuard>
			</BrowserRouter>
		</Suspense>
	);
}

export default App;

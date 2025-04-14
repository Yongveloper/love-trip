import { Navigate } from 'react-router-dom';

import { useUser } from '~/hooks/auth/useUser';

function PrivateRoute({ children }: { children: React.ReactNode }) {
	const user = useUser();

	if (user === null) {
		return <Navigate to="/signin" replace={true} />;
	}

	return <div>{children}</div>;
}

export default PrivateRoute;

import { useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { useSetAtom } from 'jotai';

import { auth } from '~/remote/firebase';
import { userAtom } from '~/store/user';

function AuthGuard({ children }: { children: React.ReactNode }) {
	const [initialize, setInitialize] = useState(false);
	const setUser = useSetAtom(userAtom);

	onAuthStateChanged(auth, (user) => {
		if (user === null) {
			setUser(null);
		} else {
			setUser({
				uid: user.uid,
				email: user.email ?? '',
				displayName: user.displayName ?? '',
				photoURL: user.photoURL ?? '',
			});
		}

		setInitialize(true);
	});

	if (initialize === false) {
		return null;
	}

	return <>{children}</>;
}

export default AuthGuard;

import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { FirebaseError } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

import { COLLECTIONS } from '~/constants';
import { auth, store } from '~/remote/firebase';

export const useGoogleSignin = () => {
	const navigate = useNavigate();

	const signin = useCallback(async () => {
		const provider = new GoogleAuthProvider();

		try {
			const { user } = await signInWithPopup(auth, provider);

			const newUser = {
				uid: user.uid,
				email: user.email,
				displayName: user.displayName,
				photoURL: user.photoURL,
			};

			await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser);

			navigate('/');
		} catch (error) {
			if (error instanceof FirebaseError) {
				if (error.code === 'auth/popup-closed-by-user') {
					return;
				}
			}
			console.error(error);
			toast.error('로그인에 실패했습니다.');
		}
	}, [navigate]);

	const signout = useCallback(() => {
		signOut(auth);
	}, []);

	return { signin, signout };
};

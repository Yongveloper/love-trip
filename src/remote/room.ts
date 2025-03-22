import { collection, doc, getDocs } from 'firebase/firestore';

import { COLLECTIONS } from '~/constants';
import { IRoom } from '~/models/room';

import { store } from './firebase';

export async function getRoom(hotelId: string) {
	const snapshot = await getDocs(
		collection(doc(store, COLLECTIONS.HOTEL, hotelId), COLLECTIONS.ROOM),
	);

	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as IRoom),
	}));
}

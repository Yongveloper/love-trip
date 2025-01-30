import {
	QuerySnapshot,
	collection,
	getDocs,
	limit,
	query,
	startAfter,
} from 'firebase/firestore';

import { COLLECTIONS } from '~/constants';
import { IHotel } from '~/models/hotel';

import { store } from './firebase';

export async function getHotels(pageParams?: QuerySnapshot<IHotel>) {
	const hotelQuery =
		pageParams === undefined
			? query(collection(store, COLLECTIONS.HOTEL), limit(10))
			: query(
					collection(store, COLLECTIONS.HOTEL),
					startAfter(pageParams),
					limit(10),
				);

	const hotelsSnapshot = await getDocs(hotelQuery);

	const items = hotelsSnapshot.docs.map(
		(doc) =>
			({
				id: doc.id,
				...doc.data(),
			}) as IHotel,
	);

	const lastVisible = hotelsSnapshot.docs[hotelsSnapshot.docs.length - 1];

	return {
		items,
		lastVisible,
	};
}

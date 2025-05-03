import {
	QuerySnapshot,
	collection,
	doc,
	documentId,
	getDoc,
	getDocs,
	limit,
	query,
	startAfter,
	where,
} from 'firebase/firestore';

import { COLLECTIONS } from '~/constants';
import { IHotel } from '~/models/hotel';
import { IRoom } from '~/models/room';

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

export async function getHotel(id: string) {
	const snapshot = await getDoc(doc(store, COLLECTIONS.HOTEL, id));

	return {
		id,
		...snapshot.data(),
	} as IHotel;
}

export async function getRecommendHotels(hotelIds: string[]) {
	const recommendQuery = query(
		collection(store, COLLECTIONS.HOTEL),
		where(documentId(), 'in', hotelIds),
	);

	const snapshot = await getDocs(recommendQuery);

	return snapshot.docs.map(
		(doc) =>
			({
				id: doc.id,
				...doc.data(),
			}) as IHotel,
	);
}

export async function getHotelWithRoom({
	hotelId,
	roomId,
}: {
	hotelId: string;
	roomId: string;
}) {
	const hotelSnapshot = await getDoc(doc(store, COLLECTIONS.HOTEL, hotelId));
	const roomSnapshot = await getDoc(
		doc(hotelSnapshot.ref, COLLECTIONS.ROOM, roomId),
	);

	return {
		hotel: hotelSnapshot.data() as IHotel,
		room: roomSnapshot.data() as IRoom,
	};
}

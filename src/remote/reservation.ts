import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore';

import { COLLECTIONS } from '~/constants';
import { IReservation } from '~/models/reservation';
import { IRoom } from '~/models/room';

import { store } from './firebase';
import { getHotel } from './hotel';

export async function makeReservation(newReservation: IReservation) {
	const hotelSnapshot = doc(store, COLLECTIONS.HOTEL, newReservation.hotelId);
	const roomSnapshot = await getDoc(
		doc(hotelSnapshot, COLLECTIONS.ROOM, newReservation.roomId),
	);

	const room = roomSnapshot.data() as IRoom;
	const 지금잔여객실수 = room.avaliableCount;

	if (지금잔여객실수 === 0) {
		throw new Error('no room');
	}

	return Promise.all([
		updateDoc(roomSnapshot.ref, {
			avaliableCount: 지금잔여객실수 - 1,
		}),
		setDoc(doc(collection(store, COLLECTIONS.RESERVATION)), newReservation),
	]);
}

export async function getReservations({ userId }: { userId: string }) {
	const reservationQuery = query(
		collection(store, COLLECTIONS.RESERVATION),
		where('userId', '==', userId),
	);

	const reservationSnapshot = await getDocs(reservationQuery);

	const result = [];

	for (const reservationDoc of reservationSnapshot.docs) {
		const reservation = {
			id: reservationDoc.id,
			...(reservationDoc.data() as IReservation),
		};

		const hotel = await getHotel(reservation.hotelId);

		result.push({
			reservation,
			hotel,
		});
	}

	return result;
}

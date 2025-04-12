import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	limit,
	orderBy,
	query,
	setDoc,
	where,
	writeBatch,
} from 'firebase/firestore';

import { COLLECTIONS } from '~/constants';
import { IHotel } from '~/models/hotel';
import { ILike } from '~/models/like';

import { store } from './firebase';

export const getLikes = async ({ userId }: { userId: string }) => {
	const snapshot = await getDocs(
		query(
			collection(store, COLLECTIONS.LIKE),
			where('userId', '==', userId),
			orderBy('order', 'asc'),
		),
	);

	return snapshot.docs.map(
		(doc) =>
			({
				id: doc.id,
				...doc.data(),
			}) as ILike,
	);
};

// 이미 찜 -> 삭제
// 찜 x -> 추가
export const toggleLike = async ({
	hotel,
	userId,
}: {
	hotel: Pick<IHotel, 'name' | 'id' | 'mainImageUrl'>;
	userId: string;
}) => {
	const findSnapshot = await getDocs(
		query(
			collection(store, COLLECTIONS.LIKE),
			where('userId', '==', userId),
			where('hotelId', '==', hotel.id),
		),
	);

	// 이미 존재함 => 삭제
	if (findSnapshot.docs.length > 0) {
		const removeTarget = findSnapshot.docs[0];
		const removeTargetOrder = removeTarget.data().order;

		const updateTargetSnapshot = await getDocs(
			query(
				collection(store, COLLECTIONS.LIKE),
				where('userId', '==', userId),
				where('order', '>', removeTargetOrder),
			),
		);

		if (updateTargetSnapshot.empty) {
			return deleteDoc(removeTarget.ref);
		}

		const batch = writeBatch(store);

		updateTargetSnapshot.forEach((doc) => {
			batch.update(doc.ref, {
				order: doc.data().order - 1,
			});
		});

		await batch.commit();

		return deleteDoc(removeTarget.ref);
	} else {
		// 없음 => 생성

		const lastLikeSnapshot = await getDocs(
			query(
				collection(store, COLLECTIONS.LIKE),
				where('userId', '==', userId),
				orderBy('order', 'desc'),
				limit(1),
			),
		);

		const lastOrder = lastLikeSnapshot.empty
			? 0
			: lastLikeSnapshot.docs[0].data().order;

		const newLike = {
			order: lastOrder + 1,
			hotelId: hotel.id,
			hotelName: hotel.name,
			hotelImageUrl: hotel.mainImageUrl,
			userId,
		};

		return await setDoc(doc(collection(store, COLLECTIONS.LIKE)), newLike);
	}
};

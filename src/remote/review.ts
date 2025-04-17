import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	setDoc,
} from 'firebase/firestore';

import { COLLECTIONS } from '~/constants';
import { IReview } from '~/models/review';
import { IUser } from '~/models/user';

import { store } from './firebase';

export const getReviews = async ({ hotelId }: { hotelId: string }) => {
	const hotelRef = doc(store, COLLECTIONS.HOTEL, hotelId);
	const reviewQuery = query(
		collection(hotelRef, COLLECTIONS.REVIEW),
		orderBy('createdAt', 'desc'),
	);

	const reviewSnapshot = await getDocs(reviewQuery);

	const reviews = reviewSnapshot.docs.map((doc) => {
		const review = doc.data();

		return {
			id: doc.id,
			...review,
			createdAt: review.createdAt.toDate() as Date,
		} as IReview;
	});

	// 이미 불러온 유저에 대해 중복 요청을 방지하는 Map
	const userMap: {
		[key: string]: IUser;
	} = {};
	const results: Array<IReview & { user: IUser }> = [];

	for (const review of reviews) {
		const cachedUser = userMap[review.userId];

		if (cachedUser) {
			results.push({
				...review,
				user: cachedUser,
			});
			continue;
		}

		const userSnapshot = await getDoc(
			doc(collection(store, COLLECTIONS.USER), review.userId),
		);
		const user = userSnapshot.data() as IUser;

		userMap[review.userId] = user;
		results.push({
			...review,
			user,
		});
	}

	return results;
};

export const writeReview = async (review: Omit<IReview, 'id'>) => {
	const hotelRef = doc(store, COLLECTIONS.HOTEL, review.hotelId);
	const reviewRef = doc(collection(hotelRef, COLLECTIONS.REVIEW));

	return await setDoc(reviewRef, review);
};

export const removeReview = async ({
	reviewId,
	hotelId,
}: {
	reviewId: string;
	hotelId: string;
}) => {
	const hotelRef = doc(store, COLLECTIONS.HOTEL, hotelId);
	const reviewRef = doc(collection(hotelRef, COLLECTIONS.REVIEW), reviewId);

	return await deleteDoc(reviewRef);
};

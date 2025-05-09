import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { collection, doc, onSnapshot } from 'firebase/firestore';

import { COLLECTIONS } from '~/constants';
import { IRoom } from '~/models/room';
import { store } from '~/remote/firebase';
import { getRoom } from '~/remote/room';

function useRooms({ hotelId }: { hotelId: string }) {
	const queryClient = useQueryClient();

	useEffect(() => {
		const unsubscribe = onSnapshot(
			collection(doc(store, COLLECTIONS.HOTEL, hotelId), COLLECTIONS.ROOM),
			(snapshot) => {
				const newRooms = snapshot.docs.map((doc) => ({
					id: doc.id,
					...(doc.data() as IRoom),
				}));

				queryClient.setQueryData(['rooms', hotelId], newRooms);
			},
		);

		return () => {
			unsubscribe();
		};
	}, [hotelId, queryClient]);

	return useQuery(['rooms', hotelId], () => getRoom(hotelId), {
		suspense: true,
	});
}

export default useRooms;

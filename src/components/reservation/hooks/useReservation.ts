import { useMutation, useQuery } from 'react-query';

import { useAlertContext } from '~/context/AlertContext';
import { IReservation } from '~/models/reservation';
import { getHotelWithRoom } from '~/remote/hotel';
import { makeReservation } from '~/remote/reservation';

export const useReservation = ({
	hotelId,
	roomId,
}: {
	hotelId: string;
	roomId: string;
}) => {
	const { open } = useAlertContext();

	const { data, isLoading } = useQuery(
		['hotelWithRoom', hotelId, roomId],
		() => getHotelWithRoom({ hotelId, roomId }),
		{
			onSuccess: ({ room }) => {
				if (room.avaliableCount === 0) {
					open({
						title: '객실이 매진 되었습니다.',
						onButtonClick: () => {
							window.history.back();
						},
					});
				}
			},
		},
	);

	const { mutateAsync } = useMutation(
		(newReservation: IReservation) => makeReservation(newReservation),
		{
			onError: () => {
				open({
					title: '알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
					onButtonClick: () => {
						window.history.back();
					},
				});
			},
		},
	);

	return { data, isLoading, makeReservation: mutateAsync };
};

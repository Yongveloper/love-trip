import { useMutation, useQuery, useQueryClient } from 'react-query';

import { useUser } from '~/hooks/auth/useUser';
import { getReviews, removeReview, writeReview } from '~/remote/review';

export const useReview = ({ hotelId }: { hotelId: string }) => {
	const user = useUser();
	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery(['reviews', hotelId], () =>
		getReviews({ hotelId }),
	);

	const { mutateAsync: write } = useMutation(
		async (text: string) => {
			const newReview = {
				createdAt: new Date(),
				hotelId,
				userId: user?.uid as string,
				text,
			};

			await writeReview(newReview);

			return true;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['reviews', hotelId]);
			},
		},
	);

	const { mutateAsync: remove } = useMutation(
		async ({ reviewId, hotelId }: { reviewId: string; hotelId: string }) => {
			await removeReview({ reviewId, hotelId });

			return true;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['reviews', hotelId]);
			},
		},
	);

	return { data, isLoading, write, remove };
};

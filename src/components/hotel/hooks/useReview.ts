import { useQuery } from 'react-query';

import { getReviews } from '~/remote/review';

export const useReview = ({ hotelId }: { hotelId: string }) => {
	const { data, isLoading } = useQuery(['reviews'], () =>
		getReviews({ hotelId }),
	);

	return { data, isLoading };
};

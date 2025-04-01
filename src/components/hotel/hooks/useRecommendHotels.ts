import { useQuery } from 'react-query';

import { getRecommendHotels } from '~/remote/hotel';

export function useRecommendHotels({ hotelIds }: { hotelIds: string[] }) {
	return useQuery(
		['recommendHotels', JSON.stringify(hotelIds)],
		() => getRecommendHotels(hotelIds),
		{
			enabled: hotelIds.length > 0,
		},
	);
}

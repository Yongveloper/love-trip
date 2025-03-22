import { useQuery } from 'react-query';

import { getHotel } from '~/remote/hotel';

export function useHotel({ id }: { id: string }) {
	return useQuery(['hotel', id], () => getHotel(id));
}

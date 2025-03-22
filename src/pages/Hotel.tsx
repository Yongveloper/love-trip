import { useParams } from 'react-router-dom';

import Carousel from '~/components/hotel/Carousel';
import { useHotel } from '~/components/hotel/hooks/useHotel';
import Top from '~/components/shared/Top';

function HotelPage() {
	const { id } = useParams() as { id: string };

	const { isLoading, data } = useHotel({ id });

	if (data === undefined || isLoading) {
		return <div>Loading...</div>;
	}

	const { name, comment, images } = data;

	return (
		<div>
			<Top title={name} subtitle={comment} />
			<Carousel images={images} />
		</div>
	);
}

export default HotelPage;

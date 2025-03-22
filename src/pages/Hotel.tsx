import { useParams } from 'react-router-dom';

import Carousel from '~/components/hotel/Carousel';
import Contents from '~/components/hotel/Contents';
import { useHotel } from '~/components/hotel/hooks/useHotel';
import Top from '~/components/shared/Top';

function HotelPage() {
	const { id } = useParams() as { id: string };

	const { isLoading, data } = useHotel({ id });

	if (data === undefined || isLoading) {
		return <div>Loading...</div>;
	}

	const { name, comment, images, contents } = data;

	return (
		<div>
			<Top title={name} subtitle={comment} />
			<Carousel images={images} />
			<Contents contents={contents} />
		</div>
	);
}

export default HotelPage;

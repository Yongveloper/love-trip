import { useParams } from 'react-router-dom';

import ActionButtons from '~/components/hotel/ActionButtons';
import Carousel from '~/components/hotel/Carousel';
import Contents from '~/components/hotel/Contents';
import Map from '~/components/hotel/Map';
import RecommendHotels from '~/components/hotel/RecommendHotels';
import Rooms from '~/components/hotel/Rooms';
import { useHotel } from '~/components/hotel/hooks/useHotel';
import Top from '~/components/shared/Top';

function HotelPage() {
	const { id } = useParams() as { id: string };

	const { isLoading, data } = useHotel({ id });

	if (data === undefined || isLoading) {
		return <div>Loading...</div>;
	}

	const { name, comment, images, contents, location, recommendHotels } = data;

	return (
		<div>
			<Top title={name} subtitle={comment} />
			<Carousel images={images} />
			<ActionButtons hotel={data} />
			<Rooms hotelId={id} />
			<Contents contents={contents} />
			<Map location={location} />
			<RecommendHotels recommendHotels={recommendHotels} />
		</div>
	);
}

export default HotelPage;

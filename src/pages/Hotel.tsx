import { useParams } from 'react-router-dom';

import { css } from '@emotion/react';

import ActionButtons from '~/components/hotel/ActionButtons';
import Carousel from '~/components/hotel/Carousel';
import Contents from '~/components/hotel/Contents';
import Map from '~/components/hotel/Map';
import RecommendHotels from '~/components/hotel/RecommendHotels';
import Review from '~/components/hotel/Review';
import Rooms from '~/components/hotel/Rooms';
import { useHotel } from '~/components/hotel/hooks/useHotel';
import SEO from '~/components/shared/SEO';
import ScrollProgressBar from '~/components/shared/ScrollProgressBar';
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
			<SEO title={name} description={comment} image={images[0]} />
			<ScrollProgressBar style={scrollProgressBarStyles} />
			<Top title={name} subtitle={comment} />
			<Carousel images={images} />
			<ActionButtons hotel={data} />
			<Rooms hotelId={id} />
			<Contents contents={contents} />
			<Map location={location} />
			<RecommendHotels recommendHotels={recommendHotels} />
			<Review hotelId={id} />
		</div>
	);
}

const scrollProgressBarStyles = css`
	position: sticky;
	top: 64px;
	z-index: 2;
`;

export default HotelPage;

import { css } from '@emotion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

function Carousel({ images }: { images: string[] }) {
	return (
		<div>
			<Swiper css={containerStyles} spaceBetween={8}>
				{images.map((imageUrl, index) => (
					<SwiperSlide key={index}>
						<img
							src={imageUrl}
							alt={`${index} + 1번째 호텔의 이미지}`}
							css={imageStyles}
							loading="lazy"
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

const containerStyles = css`
	padding: 0 24px;
	height: 300px;
`;

const imageStyles = css`
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 4px;
`;

export default Carousel;

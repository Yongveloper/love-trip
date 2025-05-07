import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLottie } from 'lottie-react';
import qs from 'qs';

import firecracker from '~/assets/lottie/firecracker.json';
import Button from '~/components/shared/Button';
import Flex from '~/components/shared/Flex';
import Spacing from '~/components/shared/Spacing';
import Text from '~/components/shared/Text';

function ReservationDone() {
	const navigate = useNavigate();
	const { hotelName } = qs.parse(window.location.search, {
		ignoreQueryPrefix: true,
	}) as {
		hotelName: string;
	};

	const [showAnimation, setShowAnimation] = useState(true);

	const { View: LottieView } = useLottie({
		animationData: firecracker,
		loop: false,
		autoplay: true,
		onComplete: () => {
			setShowAnimation(false);
		},
	});

	return (
		<div style={{ position: 'relative' }}>
			{showAnimation && (
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: '80%',
						height: '50%',
						zIndex: 1,
						pointerEvents: 'none',
					}}
				>
					{LottieView}
				</div>
			)}
			<Spacing size={80} />
			<Flex align="center" direction="column">
				<img
					src="https://cdn4.iconfinder.com/data/icons/general-office/91/General_Office_31-512.png"
					alt="Reservation Done"
					width={120}
					height={120}
				/>

				<Spacing size={30} />

				<Text typography="t4" bold={true}>
					{hotelName}
				</Text>

				<Spacing size={8} />

				<Text>예약에 성공했어요!</Text>
			</Flex>

			<Spacing size={40} />

			<div style={{ padding: 24 }}>
				<Button.Group>
					<Button onClick={() => navigate('/')}>홈으로</Button>
					<Button onClick={() => navigate('/reservation/list')}>
						예약 리스트로
					</Button>
				</Button.Group>
			</div>
		</div>
	);
}

export default ReservationDone;

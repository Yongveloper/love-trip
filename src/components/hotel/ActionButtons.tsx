import { toast } from 'react-hot-toast';

import { css } from '@emotion/react';

import { useLike } from '~/hooks/like/useLike';
import useClipboard from '~/hooks/useClipboard';
import { useShare } from '~/hooks/useShare';
import { IHotel } from '~/models/hotel';

import Flex from '../shared/Flex';
import Spacing from '../shared/Spacing';
import Text from '../shared/Text';

function ActionButtons({ hotel }: { hotel: IHotel }) {
	const share = useShare();
	const { copyToClipboard } = useClipboard();
	const { data: likes, mutate: like } = useLike();

	const isLike = Boolean(likes?.find((like) => like.hotelId === hotel.id));

	const { name, comment, mainImageUrl } = hotel;

	const handleShare = () => {
		share({
			title: name,
			description: comment,
			imageUrl: mainImageUrl,
			buttonLabel: 'Love Trip에서 보기',
		});
	};

	const handleCopy = () => {
		copyToClipboard({
			text: window.location.href,
			onSuccess: () => {
				toast.success('링크가 복사되었습니다!');
			},
		});
	};

	return (
		<Flex css={containerStyles}>
			<Button
				label="찜하기"
				onClick={() => {
					like({
						hotel: {
							name,
							id: hotel.id,
							mainImageUrl,
						},
					});
				}}
				iconUrl={
					isLike
						? 'https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-64.png'
						: 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-heart-outline-64.png'
				}
			/>
			<Button
				label="공유하기"
				onClick={handleShare}
				iconUrl="https://cdn1.iconfinder.com/data/icons/rounded-social-media/512/kakao-64.png"
			/>
			<Button
				label="링크복사"
				onClick={handleCopy}
				iconUrl="https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/paste-clipboard-copy-512.png"
			/>
		</Flex>
	);
}

function Button({
	label,
	iconUrl,
	onClick,
}: {
	label: string;
	iconUrl: string;
	onClick: () => void;
}) {
	return (
		<Flex direction="column" align="center" onClick={onClick}>
			<img src={iconUrl} alt="" width={30} height={30} />
			<Spacing size={6} />
			<Text typography="t7">{label}</Text>
		</Flex>
	);
}

const containerStyles = css`
	padding: 24px;
	cursor: pointer;

	& * {
		flex: 1;
	}
`;

export default ActionButtons;

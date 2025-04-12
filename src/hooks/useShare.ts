import { useCallback } from 'react';

interface IShareProps {
	title: string;
	description: string;
	imageUrl: string;
	buttonLabel: string;
}

export function useShare() {
	const handleShare = useCallback(
		({ title, description, imageUrl, buttonLabel }: IShareProps) => {
			window.Kakao.Share.sendDefault({
				objectType: 'feed',
				content: {
					title,
					description,
					imageUrl,
					link: {
						mobileWebUrl: window.location.href,
						webUrl: window.location.href,
					},
				},
				buttons: [
					{
						title: buttonLabel,
						link: {
							mobileWebUrl: window.location.href,
							webUrl: window.location.href,
						},
					},
				],
			});
		},
		[],
	);

	return handleShare;
}

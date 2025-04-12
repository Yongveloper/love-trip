import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useAlertContext } from '~/context/AlertContext';
import { IHotel } from '~/models/hotel';
import { getLikes, toggleLike } from '~/remote/like';

import { useUser } from '../auth/useUser';

export const useLike = () => {
	const user = useUser();
	const { open } = useAlertContext();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { data } = useQuery(
		['likes'],
		() => getLikes({ userId: user?.uid as string }),
		{
			enabled: !!user,
		},
	);

	const { mutate } = useMutation(
		({ hotel }: { hotel: Pick<IHotel, 'name' | 'id' | 'mainImageUrl'> }) => {
			if (!user) {
				throw new Error('로그인 필요');
			}

			return toggleLike({ hotel, userId: user.uid });
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['likes']);
			},
			onError: (error: Error) => {
				if (error.message === '로그인 필요') {
					open({
						title: '로그인이 필요한 기능입니다.',
						onButtonClick: () => navigate('/signin'),
					});
					return;
				}

				open({
					title: '알 수 없는 에러가 발생했습니다. 잠시후 다시 시도해주세요.',
					onButtonClick: () => {
						// 다른 액션
					},
				});
			},
		},
	);

	return { data, mutate };
};

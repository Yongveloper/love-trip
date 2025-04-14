import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

import { useAlertContext } from '~/context/AlertContext';
import { useLike } from '~/hooks/like/useLike';
import { ILike } from '~/models/like';
import { updateOrder } from '~/remote/like';

export const useEditLike = () => {
	const { data } = useLike();
	const [updatedLikes, setUpdatedLikes] = useState<ILike[]>([]);
	const [isEdit, setIsEdit] = useState(false);
	const { open } = useAlertContext();
	const queryClient = useQueryClient();
	const initialLikes = useRef<ILike[]>([]);

	useEffect(() => {
		if (data) {
			setUpdatedLikes(data);
			initialLikes.current = data;
		}
	}, [data]);

	const reorder = useCallback((from: number, to: number) => {
		if (from === to) {
			return;
		}

		setUpdatedLikes((prevUpdatedLikes) => {
			const newItems = [...prevUpdatedLikes];

			const [fromItem] = newItems.splice(from, 1);

			if (fromItem) {
				newItems.splice(to, 0, fromItem);
			}

			newItems.forEach((like, index) => {
				like.order = index + 1;
			});

			const hasChanged = newItems.some(
				(like, index) => like.order !== initialLikes.current[index].order,
			);
			setIsEdit(hasChanged);

			return newItems;
		});
	}, []);

	const save = async () => {
		try {
			await updateOrder(updatedLikes);
			queryClient.setQueryData(['likes'], updatedLikes);
			setIsEdit(false);
			toast.success('변경사항이 저장되었습니다!');
		} catch (error) {
			console.error(error);
			open({
				title: '알 수 없는 에러가 발생하였습니다.',
				onButtonClick: () => {
					setIsEdit(false);
				},
			});
		}
	};

	return { data: isEdit ? updatedLikes : data, isEdit, reorder, save };
};

import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import toast from 'react-hot-toast';

import { format } from 'date-fns';

import { useUser } from '~/hooks/auth/useUser';

import Button from '../shared/Button';
import Flex from '../shared/Flex';
import ListRow from '../shared/ListRow';
import Spacing from '../shared/Spacing';
import Text from '../shared/Text';
import TextField from '../shared/TextField';
import { useReview } from './hooks/useReview';

function Review({ hotelId }: { hotelId: string }) {
	const { data: reviews, isLoading, write, remove } = useReview({ hotelId });
	const user = useUser();

	const [text, setText] = useState('');

	const reviewRows = useCallback(() => {
		if (reviews?.length === 0) {
			return (
				<Flex direction="column" align="center" style={{ margin: '40px 0' }}>
					<img
						src="https://cdn3.iconfinder.com/data/icons/iconpark-vol-2/48/mail-review-512.png"
						alt="리뷰 이미지"
						width={60}
						height={60}
					/>
					<Spacing size={10} />
					<Text typography="t6">
						아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요!
					</Text>
				</Flex>
			);
		}

		return (
			<ul>
				{reviews?.map((review) => (
					<ListRow
						key={review.id}
						left={
							review.user.photoURL && (
								<img
									src={review.user.photoURL}
									alt="리뷰한 유저 이미지"
									width={40}
									height={40}
								/>
							)
						}
						contents={
							<ListRow.Texts
								title={review.text}
								subTitle={format(review.createdAt, 'yyyy-MM-dd')}
							/>
						}
						right={
							review.userId === user?.uid && (
								<Button
									onClick={async () => {
										const success = await remove({
											reviewId: review.id,
											hotelId: hotelId,
										});

										if (success) {
											toast.success('리뷰가 삭제되었어요.');
										}
									}}
								>
									삭제
								</Button>
							)
						}
					/>
				))}
			</ul>
		);
	}, [reviews, user, hotelId, remove]);

	const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	}, []);

	const handleSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const success = await write(text);

			if (success) {
				setText('');
				toast.success('리뷰가 작성되었어요 🎉');
			}
		},
		[text, write],
	);

	if (isLoading) {
		return null;
	}

	return (
		<div style={{ margin: '40px 0' }}>
			<Text bold={true} typography="t4" style={{ padding: '0 24px' }}>
				리뷰
			</Text>
			<Spacing size={16} />
			{reviewRows()}
			{user && (
				<form style={{ padding: '0 24px' }} onSubmit={handleSubmit}>
					<TextField value={text} onChange={handleTextChange} />
					<Spacing size={6} />
					<Flex justify="flex-end">
						<Button type="submit" disabled={text === ''}>
							작성
						</Button>
					</Flex>
				</form>
			)}
		</div>
	);
}

export default Review;

import { useCallback } from 'react';

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
	const { data: reviews, isLoading } = useReview({ hotelId });
	const user = useUser();

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
								subTitle={format(review.createdAt, 'yyyy-mm-dd')}
							/>
						}
						right={review.userId === user?.uid && <Button>삭제</Button>}
					/>
				))}
			</ul>
		);
	}, [reviews, user]);

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
				<div style={{ padding: '0 24px' }}>
					<TextField />
					<Spacing size={6} />
					<Flex justify="flex-end">
						<Button disabled={true}>작성</Button>
					</Flex>
				</div>
			)}
		</div>
	);
}

export default Review;

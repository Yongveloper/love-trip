import { useNavigate } from 'react-router-dom';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import qs from 'qs';

import { useAlertContext } from '~/context/AlertContext';
import { useUser } from '~/hooks/auth/useUser';
import { addDelimiter } from '~/utils/addDelimiter';

import Button from '../shared/Button';
import Flex from '../shared/Flex';
import ListRow from '../shared/ListRow';
import Spacing from '../shared/Spacing';
import Tag from '../shared/Tag';
import Text from '../shared/Text';
import withSuspense from '../shared/hocs/withSuspense';
import useRooms from './hooks/useRooms';

function Rooms({ hotelId }: { hotelId: string }) {
	const { data } = useRooms({ hotelId });
	const user = useUser();
	const { open } = useAlertContext();
	const navigate = useNavigate();

	return (
		<Container>
			<Header justify="space-between" align="center">
				<Text bold={true} typography="t4">
					객실정보
				</Text>
				<Text typography="t6" color="gray400">
					1박, 세금 포함
				</Text>
			</Header>
			<ul>
				{data?.map((room) => {
					const 마감임박인가 = room.avaliableCount === 1;
					const 매진인가 = room.avaliableCount === 0;

					const params = qs.stringify({
						roomId: room.id,
						hotelId,
					});

					return (
						<ListRow
							left={
								<img
									src={room.imageUrl}
									alt={`${room.roomName} 의 객실 이미지`}
									css={imageStyles}
								/>
							}
							contents={
								<ListRow.Texts
									title={
										<Flex>
											<Text>{room.roomName}</Text>
											{마감임박인가 && (
												<>
													<Spacing direction="horizontal" size={6} />
													<Tag backgroundColor="red">마감임박</Tag>
												</>
											)}
										</Flex>
									}
									subTitle={`${addDelimiter(room.price)}원 / `.concat(
										room.refundable ? '환불가능' : '환불불가',
									)}
								/>
							}
							right={
								<Button
									size="medium"
									disabled={매진인가}
									onClick={() => {
										if (!user) {
											open({
												title: '로그인이 필요한 기능입니다.',
												onButtonClick: () => {
													navigate('/signin');
												},
											});

											return;
										}

										navigate(`/schedule?${params}`);
									}}
								>
									{매진인가 ? '매진' : '선택'}
								</Button>
							}
							key={room.id}
						/>
					);
				})}
			</ul>
		</Container>
	);
}

const Container = styled.div`
	margin: 40px 0;
`;

const Header = styled(Flex)`
	padding: 0 24px;
	margin-bottom: 20px;
`;

const imageStyles = css`
	width: 80px;
	height: 80px;
	object-fit: cover;
	border-radius: 4px;
`;

export default withSuspense(Rooms, {
	fallback: <div>객실정보 불러오는중...</div>,
});

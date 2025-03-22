import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { addDelimiter } from '~/utils/addDelimiter';

import Button from '../shared/Button';
import Flex from '../shared/Flex';
import ListRow from '../shared/ListRow';
import Spacing from '../shared/Spacing';
import Tag from '../shared/Tag';
import Text from '../shared/Text';
import useRooms from './hooks/useRooms';

function Rooms({ hotelId }: { hotelId: string }) {
	const { data } = useRooms({ hotelId });

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
								<Button size="medium" disabled={매진인가}>
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

export default Rooms;

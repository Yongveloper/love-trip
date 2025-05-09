import { Virtuoso } from 'react-virtuoso';

import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from '@hello-pangea/dnd';

import { useEditLike } from '~/components/settings/like/hooks/useEditLike';
import FixedBottomButton from '~/components/shared/FixedBottomButton';
import ListRow from '~/components/shared/ListRow';
import { ILike } from '~/models/like';

function generateMocks() {
	const mocks = [];

	for (let i = 0; i < 1000; i++) {
		mocks.push({
			id: `${i}`,
			hotelId: `hotel ${i}`,
			hotelName: `hotel ${i}`,
			hotelImageUrl: `hotel ${i}`,
			userId: '',
			order: i,
		} as ILike);
	}

	return mocks;
}

function LikePage() {
	const { isEdit, reorder, save } = useEditLike();

	const handleDragEndDrop = (result: DropResult) => {
		if (!result.destination) {
			return;
		}

		const from = result.source.index;
		const to = result.destination.index;

		reorder(from, to);
	};

	const mocks = generateMocks();

	return (
		<div>
			<DragDropContext onDragEnd={handleDragEndDrop}>
				<Droppable droppableId="likes">
					{(droppableProps) => (
						<ul
							{...droppableProps.droppableProps}
							ref={droppableProps.innerRef}
						>
							<Virtuoso
								useWindowScroll
								increaseViewportBy={0}
								data={mocks}
								itemContent={(index, like) => {
									return (
										<Draggable
											key={like.id}
											draggableId={like.id}
											index={index}
										>
											{(draggableProps) => (
												<li
													ref={draggableProps.innerRef}
													{...draggableProps.draggableProps}
													{...draggableProps.dragHandleProps}
												>
													<ListRow
														as="div"
														contents={
															<ListRow.Texts
																title={like.order}
																subTitle={like.hotelName}
															/>
														}
														right={
															<img
																src={like.hotelImageUrl}
																alt={like.hotelName}
																style={{
																	width: '100px',
																	height: '100px',
																	objectFit: 'cover',
																}}
															/>
														}
													/>
												</li>
											)}
										</Draggable>
									);
								}}
							/>

							{droppableProps.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
			{isEdit && <FixedBottomButton label="저장하기" onClick={save} />}
		</div>
	);
}

export default LikePage;

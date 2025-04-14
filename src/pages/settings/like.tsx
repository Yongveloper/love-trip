import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from '@hello-pangea/dnd';

import { useEditLike } from '~/components/settings/like/hooks/useEditLike';
import FixedBottomButton from '~/components/shared/FixedBottomButton';
import ListRow from '~/components/shared/ListRow';

function LikePage() {
	const { data, isEdit, reorder, save } = useEditLike();

	const handleDragEndDrop = (result: DropResult) => {
		if (!result.destination) {
			return;
		}

		const from = result.source.index;
		const to = result.destination.index;

		reorder(from, to);
	};

	return (
		<div>
			<DragDropContext onDragEnd={handleDragEndDrop}>
				<Droppable droppableId="likes">
					{(droppableProps) => (
						<ul
							{...droppableProps.droppableProps}
							ref={droppableProps.innerRef}
						>
							{data?.map((like, index) => (
								<Draggable key={like.id} draggableId={like.id} index={index}>
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
							))}
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

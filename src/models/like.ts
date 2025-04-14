// 찜하기 정보에 모든 호텔 정보를 담고 있는 구조는 좋지 않음
// 호텔 ID만 저장하고, ID를 통해서 호텔 정보를 가져오는 구조로 변경해야함
export interface ILike {
	id: string;
	hotelId: string;
	hotelName: string;
	hotelImageUrl: string;
	userId: string;
	order: number;
}

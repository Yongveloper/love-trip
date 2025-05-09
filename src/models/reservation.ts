export interface IReservation {
	userId: string;
	hotelId: string;
	roomId: string;
	startDate: string;
	endDate: string;
	price: number;
	formValues: {
		[key: string]: string;
	};
}

export interface IHotel {
	comment: string;
	contents: string;
	id: string;
	images: string[];
	location: { direction: string; pointGeolocation: { x: number; y: number } };
	mainImageUrl: string;
	name: string;
	price: number;
	startRating: number;
}

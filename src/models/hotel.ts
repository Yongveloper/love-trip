export interface IHotel {
	comment: string;
	contents: string;
	id: string;
	images: string[];
	location: { directions: string; pointGeolocation: { x: number; y: number } };
	mainImageUrl: string;
	name: string;
	price: number;
	startRating: number;
	events: {
		name: string;
		promoEndTime?: string;
		tagThemeStyle: {
			backgroundColor: string;
			fontColor: string;
		};
	};
	recommendHotels: string[];
	forms: ReservationForm[];
}

interface IBaseForm {
	id: string;
	label: string;
	required: boolean;
	helpMessage?: string;
}

interface ITextFieldForm extends IBaseForm {
	type: 'TEXT_FIELD';
}

interface ISelectFieldForm extends IBaseForm {
	type: 'SELECT';
	options: {
		label: string;
		value: string;
	}[];
}

export type ReservationForm = ITextFieldForm | ISelectFieldForm;

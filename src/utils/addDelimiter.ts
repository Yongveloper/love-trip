export const addDelimiter = (value: number | string, delimiter = ',') => {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
};

import { DateRange, DayPicker } from 'react-day-picker';
import { ko } from 'react-day-picker/locale';

import styled from '@emotion/styled';
import { differenceInDays, format, parseISO } from 'date-fns';

import { colors } from '~/styles/colorPalette';

interface IRangePickerProps {
	startDate?: string;
	endDate?: string;
	onChange: (dateRange: { from?: string; to?: string; nights: number }) => void;
}

function RangePicker({ startDate, endDate, onChange }: IRangePickerProps) {
	const today = new Date();

	const handleDayClick = (dataRange: DateRange | undefined) => {
		if (!dataRange) {
			return;
		}
		const { from, to } = dataRange;

		onChange({
			from: from ? format(from, 'yyyy-MM-dd') : undefined,
			to: to ? format(to, 'yyyy-MM-dd') : undefined,
			nights: from && to ? differenceInDays(to, from) : 0,
		});
	};

	const selected = {
		from: startDate ? parseISO(startDate) : undefined,
		to: endDate ? parseISO(endDate) : undefined,
	};

	return (
		<Container>
			<DayPicker
				mode="range"
				numberOfMonths={5}
				locale={ko}
				defaultMonth={today}
				onSelect={handleDayClick}
				selected={selected}
			/>
		</Container>
	);
}

export default RangePicker;

const Container = styled.div`
	padding-bottom: 80px;

	.rdp-month {
		position: relative;
		width: 100%;
		text-align: center;
		padding: 60px 0px 30px;
	}

	.rdp-month_caption {
		position: absolute;
		top: 25px;
		left: 20px;
		color: ${colors.black};
		font-weight: bold;
	}

	.rdp-nav {
		display: none;
	}

	.rdp-month_grid {
		width: 100%;
	}

	.rdp-month_grid .rdp-weekdays {
		font-size: 12px;
		height: 45px;
		color: ${colors.gray400};
		font-weight: bold;
	}

	.rdp-weeks .rdp-week {
		height: 45px;
	}

	.rdp-day .rdp-day_button {
		position: relative;
		width: 100%;
		line-height: 45px;
	}

	.rdp-selected {
		background-color: ${colors.blue100};
		position: relative;
	}

	.rdp-day.rdp-range_start,
	.rdp-day.rdp-range_end {
		color: ${colors.white};
	}

	.rdp-day.rdp-range_start::after,
	.rdp-day.rdp-range_end::after {
		z-index: -1;
		display: block;
		width: calc(100% - 1px);
		height: 45px;
		position: absolute;
		top: 50%;
		bottom: 0px;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: ${colors.blue};
		content: '';
	}
`;

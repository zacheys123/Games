import { useState } from 'react';
import './create.css';
import { Stack, Box, unstable_composeClasses } from '@mui/material';
const CreateName = () => {
	const month = [
		'jan',
		'feb',
		'mar',
		'apr',
		'may',
		'jun',
		'jul',
		'aug',
		'sept',
		'oct',
		'nov',
		'dec',
	];
	const [mnth, setMonth] = useState('jan');
	const [days, setDay] = useState('1');
	const [year, setYear] = useState('2000');
	function day(start, end) {
		const days = [];
		while (start <= end) {
			days.push(start++);
		}
		return days;
	}

	return (
		<Stack className="main__create">
			<Box className="create">
				<Box>
					<h3 style={{ margin: '1rem' }}> Additional Info</h3>
				</Box>{' '}
				<Box>
					<form>
						<input type="text" placeholder="Bussiness/Company Name" />
						<select
							name="month"
							id=""
							value={mnth}
							onChange={(ev) => setMonth(ev.target.value)}
						>
							{month.map((data) => {
								return <option value={data}>{data}</option>;
							})}
						</select>
						<select
							name="day"
							id=""
							value={day}
							onChange={(ev) => setDay(ev.target.value)}
						>
							{day(1, 31).map((data) => {
								return <option value={data}>{data}</option>;
							})}
						</select>
						<select
							name="year"
							id=""
							value={year}
							onChange={(ev) => setYear(ev.target.value)}
						>
							{day(1950, 2022).map((data) => {
								return <option value={data}>{data}</option>;
							})}
						</select>
						<input type="text" placeholder="Bussiness/Company Name" />
					</form>
				</Box>
			</Box>
		</Stack>
	);
};

export default CreateName;

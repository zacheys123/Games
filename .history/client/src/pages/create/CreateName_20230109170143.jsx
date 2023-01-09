import { useState } from 'react';
import './create.css';
import { Stack, Box, MenuItem, Select } from '@mui/material';
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
	const [birth] = useState(`${days}/${mnth}/${year}`);

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
						<input
							type="text"
							placeholder="Bussiness/Company Name"
							required
						/>
						<Box>
							<Select
								className="date"
								name="month"
								id=""
								value={mnth}
								onChange={(ev) => setMonth(ev.target.value)}
							>
								{month.map((data) => {
									return (
										<MenuItem key="" value={data}>
											{data}
										</MenuItem>
									);
								})}
							</Select>
							<Select
								className="date"
								name="day"
								id=""
								value={days}
								onChange={(ev) => setDay(ev.target.value)}
							>
								{day(1, 31).map((_, dat) => {
									return (
										<MenuItem key="" value={dat}>
											{dat}
										</MenuItem>
									);
								})}
							</Select>
							<Select
								className="date"
								name="year"
								id=""
								value={year}
								onChange={(ev) => setYear(ev.target.value)}
							>
								{day(1950, 2022).map((da) => {
									return (
										<MenuItem key="" value={da}>
											{da}
										</MenuItem>
									);
								})}
							</Select>
						</Box>
						<input
							type="text"
							disabled
							value={birth}
							placeholder="Bussiness/Company Name"
						/>
					</form>
				</Box>
			</Box>
		</Stack>
	);
};

export default CreateName;

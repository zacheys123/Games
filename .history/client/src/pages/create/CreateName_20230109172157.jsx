import { useState, useCallback } from 'react';
import './create.css';
import { Stack, Box, MenuItem, Select, Button } from '@mui/material';
const CreateName = () => {
	const month = [
		'Jan',
		'Feb',
		'Nar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sept',
		'Oct',
		'Nov',
		'Dec',
	];
	const [mnth, setMonth] = useState('Jan');
	const [days, setDay] = useState('1');
	const [year, setYear] = useState('2000');
	const [additional, setAdditional] = useState({
		bsname: '',
		birth: `${days}/${mnth}/${year}`,
	});

	function day(start, end) {
		const days = [];
		while (start <= end) {
			days.push(start++);
		}
		return days;
	}
	const register = useCallback(() => {}, [input]);
	return (
		<Stack className="main__create">
			<Box className="create">
				<Box>
					<h3 style={{ margin: '1rem' }}> Additional Info</h3>
				</Box>{' '}
				<Box>
					<form onSubmit={register}>
						<input
							type="text"
							name="bsname"
							value={additional?.bsname}
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
										<MenuItem key="mi" value={data}>
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
										<MenuItem key="day" value={dat}>
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
										<MenuItem key="y" value={da}>
											{da}
										</MenuItem>
									);
								})}
							</Select>
						</Box>
						<input
							type="text"
							disabled
							name="birthdate"
							value={additional?.birth}
							placeholder="Date of Birth"
						/>
						<Button
							variant="outlined"
							sx={{ margin: 'auto 50% auto 35%' }}
						>
							Proceed
						</Button>
					</form>
				</Box>
			</Box>
		</Stack>
	);
};

export default CreateName;

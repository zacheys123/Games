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
	function day() {
		const day = [];
		for (let i = 1; i < 32; i++) {
			day.push[i];
		}
		return day;
	}
	day();
	console.log(mnth);
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
						<input type="text" placeholder="Bussiness/Company Name" />
					</form>
				</Box>
			</Box>
		</Stack>
	);
};

export default CreateName;

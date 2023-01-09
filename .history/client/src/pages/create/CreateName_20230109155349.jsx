import React from 'react';
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
		'november',
		'dec',
	];
	const date = new Date();
	console.log(month[date.getMonth()]);
	return (
		<Stack className="main__create">
			<Box className="create">
				<Box>
					<h3 style={{ margin: '1rem' }}> Additional Info</h3>
				</Box>{' '}
				<Box>
					<form>
						<input type="text" placeholder="Bussiness/Company Name" />
						<select name="" id="">
							{month.map((data) => {
								<options value={data{}data}</options>;
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

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
		'dec',
	];
	const date = new Date();
	console.log();
	return (
		<Stack className="main__create">
			<Box className="create">
				<Box>
					<h3 style={{ margin: '1rem' }}> Additional Info</h3>
				</Box>{' '}
				<Box>
					<form>
						<input type="text" placeholder="Bussiness/Company Name" />
						<select name="month" id="" value={month}>
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

import React from 'react';
import './create.css';
import { Stack, Box } from '@mui/material';
const CreateName = () => {
	return (
		<Stack className="main__create">
			<Box className="create">
				<Box>
					<h3 style={{ margin: '1rem' }}> Additional Info</h3>
				</Box>{' '}
				<Box>
					<form>
						<input type="text" placeholder="Bussiness/Company Name" />
					</form>
				</Box>
			</Box>
		</Stack>
	);
};

export default CreateName;

import React from 'react';
import '../../../../css/score.css';
import { Box } from '@mui/material';
import { useMainContext } from '../../../content/context_/MainContext';
const Score = () => {
	return (
		<div className="main">
			<Box className="main__score"></Box>
		</div>
	);
};

export default Score;

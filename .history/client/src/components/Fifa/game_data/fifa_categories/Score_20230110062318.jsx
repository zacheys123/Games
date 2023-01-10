import React from 'react';
import '../../../../css/score.css';
import { Box } from '@mui/material';
import { useMainContext } from '../../../../context/context_/MainContxt';
const Score = () => {
	return (
		<div className="main">
			<Box className="main__score"></Box>
		</div>
	);
};

export default Score;

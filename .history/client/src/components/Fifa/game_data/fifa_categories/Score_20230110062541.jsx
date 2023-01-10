import React from 'react';
import '../../../../css/score.css';
import { Box } from '@mui/material';
import { useGameContext } from '../../../../context/context_/GameContext';
const Score = () => {
	const {
		mode_state: { gaming },
		setMode,
	} = useGameContext();
	return (
		<div className="main">
			<Box className="main__score"></Box>
		</div>
	);
};

export default Score;

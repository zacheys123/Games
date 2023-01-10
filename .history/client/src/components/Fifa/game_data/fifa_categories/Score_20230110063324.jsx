import React from 'react';
import '../../../../css/score.css';
import { Box } from '@mui/material';
import { useGameContext } from '../../../../context/context_/GameContext';
const Score = () => {
	const {
		modes_state: { gaming },
		setMode,
	} = useGameContext();
	console.log(gaming);
	return (
		<div className="main">
			<Box className="main__score">
				{gaming.map((_, data) => {
					<Box>
						<h6 style={{ color: 'red' }}>
							{data.player1?.toUpperCase()}
						</h6>
						<input
							type="text"
							disabled
							className="player1"
							name="player1_team"
							value={data.player1_team}
							placeholder="Team one"
						/>
					</Box>;
				})}
			</Box>
		</div>
	);
};

export default Score;

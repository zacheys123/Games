import React, { useState } from 'react';
import '../../../../css/score.css';
import { Box } from '@mui/material';
import { useGameContext } from '../../../../context/context_/GameContext';
const Score = () => {
	const {
		modes_state: { gaming },
		setMode,
	} = useGameContext();
	const [temp_data, setTemp] = useState(
		JSON.parse(localStorage.getItem('rec_games')),
	);
	console.log(temp_data);
	return (
		<div className="main">
			<Box className="main__score">
				{temp_data.map((_, data) => {
					return (
						<Box key={data._id}>
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
						</Box>
					);
				})}
			</Box>
		</div>
	);
};

export default Score;

import React, { useState, useCallback } from 'react';
import '../../../../css/score.css';
import { Box, Button, Stack } from '@mui/material';
import { Game_Reg } from '../../../../context/actions/gameSlice';
import { useGameContext } from '../../../../context/context_/GameContext';
const Score = ({ mygames }, { game_data, setTemp, rec_match }) => {
	const {
		modes_state: {
			game_info,
			loading,
			error,
			iserror,
			success,
			issuccess,
		},
		setMode,
	} = useGameContext();

	const {
		_id,
		player1,
		player2,
		player1_team,
		player2_team,
		station,
	} = mygames;

	const [extra_data, setExtraData] = useState({
		p1goals: '',
		p2goals: '',
		amount: '',
		paid: '',
		outcome: '',
	});
	const setGame = useCallback(
		(ev) => {
			ev.preventDefault();

			const matchno = /^\d+$/;
			let newdata = {
				...mygames,
				...extra_data,
			};
			const currUser = JSON.parse(
				window.localStorage.getItem('profile'),
			);
			if (
				extra_data.p1goals &&
				extra_data.p2goals &&
				extra_data.amount &&
				extra_data.paid &&
				extra_data.outcome
			) {
				if (
					matchno.test(extra_data.amount) ||
					matchno.test(extra_data.paid)
					// 	extra_data.p2goals.match(matchno) ||
					// 	extra_data.amount.match(matchno) ||
					// 	extra_data.paid.match(matchno)
				) {
					Game_Reg(
						newdata,
						setMode,
						loading,
						currUser?.result?._id,
						issuccess,
					);
					window.localStorage.removeItem('rec_games');
				}
				setMode({
					type: 'NUMBERS',
					payload: 'Only Numbers[0-9] are allowed',
				});
			} else {
				setMode({
					type: 'EMPTY',
					payload: 'No empty inputs allowed',
				});
			}
		},
		[extra_data, mygames],
	);

	const handleExtra = (ev) => {
		setExtraData((extra_data) => {
			return { ...extra_data, [ev.target.name]: ev.target.value };
		});
	};

	const remove = (index) => {
		// window.localStorage.getItem('rec_games');
		// rec_match.splice(index, 1);
		// window.localStorage.setItem(
		// 	'rec_games',
		// 	JSON.stringify([...rec_match, game_data]),
		// );

		const newGames = rec_match.filter((gam) => gam._id !== index);
		setTemp(newGames);
	};
	const [mybutton, setButton] = useState(true);
	const handleKey = (ev) => {
		// if (
		// 	extra_data.p1goals.length > 0 &&
		// 	extra_data.p2goals.length > 0 &&
		// 	extra_data.amount.length >= 2 &&
		// 	extra_data.paid.length >= 1 &&
		// 	extra_data.outcome.length > 0
		// ) {
		// 	setButton((prev) => !prev);
		// }
		// setButton((prev) => prev);
	};
	return (
		<Stack direction="column" className="">
			<Box className="main__score">
				<Box className="p1">
					<h6 style={{ color: 'red' }}>{player1?.toUpperCase()}</h6>
					<input
						type="text"
						disabled
						className="player1"
						name="player1_team"
						value={player1_team}
						placeholder="Team one"
					/>
					<input
						type="text"
						style={{
							color: 'black',
							width: '95%',
							marginTop: '1rem',
						}}
						placeholder="p1 score"
						id="p1goals"
						name="p1goals"
						value={extra_data.p1goals}
						onChange={handleExtra}
					/>
				</Box>

				<Box className="p2">
					{' '}
					<h6 style={{ color: 'red' }}>{player2?.toUpperCase()}</h6>
					<input
						disabled
						type="text"
						className="player2"
						name="player2_team"
						value={player2_team}
						placeholder="Team two"
					/>
					<input
						type="text"
						style={{
							color: 'black',
							width: '95%',
							marginTop: '1rem',
						}}
						placeholder="p2 score"
						id="p2goals"
						name="p2goals"
						value={extra_data?.p2goals}
						onChange={handleExtra}
					/>
				</Box>
			</Box>
			{iserror && (
				<Box
					sx={{
						textAlign: 'center',
						color: 'red',
						fontWeight: '200',
					}}
				>
					{error}
				</Box>
			)}
			{issuccess && (
				<Box
					sx={{
						textAlign: 'center',
						color: 'lightblue',
						fontWeight: 'bold',
					}}
				>
					{success}
				</Box>
			)}
			<div className="outcome">
				<input
					type="text"
					name="outcome"
					onChange={handleExtra}
					value={extra_data?.outcome}
					className="outcome"
					placeholder="Match Winner"
					onKeyUp={handleKey}
				/>
			</div>
			{mybutton && (
				<>
					<Button
						onClick={setGame}
						variant="outlined"
						type="submit"
						className="butt button"
					>
						{loading ? (
							<CircularProgress
								color="secondary"
								sx={{
									fontSize: '.6rem !important',
									marginRight: '.6rem',
								}}
							/>
						) : (
							<> End/Save Match</>
						)}
					</Button>
					<Button
						variant="outlined"
						type="submit"
						onClick={() => remove(_id)}
						className="butt"
					>
						Remove
					</Button>
				</>
			)}
		</Stack>
	);
};

export default Score;

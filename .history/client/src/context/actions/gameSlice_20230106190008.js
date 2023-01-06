import axios from 'axios';
let baseUrl = process.env.REACT_APP_HOST;
export const Game_Reg = async (
	player_data,
	setMode,
	loading,
	user,
	issuccess,
	success,
) => {
	try {
		await axios.put(
			` ${baseUrl}/game/quickmatch/${user}`,
			player_data,
		);
		setTimeout(() => {
			setMode({ type: 'POST', loading, issuccess });
		}, 2000);
		setMode({
			type: 'POST_ERROR',
			payload: {
				loading,
				success: 'Game has been recorded successfully',
			},
		});
	} catch (error) {
		setMode({ type: 'POST_ERROR', loading });
		console.log(error.message);
	} finally {
		setMode({ type: 'POST_ERROR', loading });
	}
};

export const getplayer = async (source, setGame) => {
	try {
		let response = await axios.get('/game', {
			cancelToken: source.token,
		});
		setGame({ type: 'LOAD_GAMES', payload: response.data.result });
	} catch (error) {
		setGame({ type: 'ERROR_GAMES' });
	} finally {
		setGame({ type: 'ERROR_GAMES' });
	}
};

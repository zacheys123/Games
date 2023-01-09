import { useState, useCallback, useEffect, useRef } from 'react';
import './create.css';
import {
	Stack,
	Box,
	MenuItem,
	Select,
	Button,
	CircularProgress,
} from '@mui/material';
import { useMainContext } from '../../context/context_/MainContext';
import Modal from '../profile/Modal';
import { createAdditional } from '../../context/actions/user';
import { useNavigate } from 'react-router-dom';
const CreateName = () => {
	const {
		main: { iserror, error, success, successmessage, loading },
		setMainContext,
	} = useMainContext();
	const month = [
		'Jan',
		'Feb',
		'Nar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sept',
		'Oct',
		'Nov',
		'Dec',
	];
	const [mnth, setMonth] = useState('Jan');
	const [days, setDay] = useState('1');
	const [year, setYear] = useState('2000');
	const [additional, setAdditional] = useState({
		bsname: '',
		birth: `${days}/${mnth}/${year}`,
	});

	function day(start, end) {
		const days = [];
		while (start <= end) {
			days.push(start++);
		}
		return days;
	}
	const add = useRef();
	const navigate = useNavigate();
	const id = JSON.parse(window.localStorage.getItem('profile'));
	const register = useCallback(() => {
		const additional_data = { add, userId: id?.result?._id };
		if (additional?.bsname && additional.birth) {
			createAdditional(
				setMainContext,
				additional_data,
				success,
				successmessage,
				loading,
				navigate,
			);
		} else {
			setMainContext({
				type: 'REGERROR',
				payload: { iserror, error: 'All fields must be entered' },
			});
		}
	}, [setMainContext]);
	useEffect(() => {
		add.current = additional;
	}, []);
	return (
		<Stack className="main__create">
			<Box className="create">
				<Box className="h3">
					<h3 style={{ margin: '1rem' }}> Additional Info</h3>
				</Box>{' '}
				<Box>
					<form onSubmit={register}>
						<input
							type="text"
							name="bsname"
							value={additional?.bsname}
							placeholder="Bussiness/Company Name"
							required
						/>
						<Box>
							<Select
								className="date"
								name="month"
								id=""
								value={mnth}
								onChange={(ev) => setMonth(ev.target.value)}
							>
								{month.map((data) => {
									return (
										<MenuItem key="mi" value={data}>
											{data}
										</MenuItem>
									);
								})}
							</Select>
							<Select
								className="date"
								name="day"
								id=""
								value={days}
								onChange={(ev) => setDay(ev.target.value)}
							>
								{day(1, 31).map((_, dat) => {
									return (
										<MenuItem key="day" value={dat}>
											{dat}
										</MenuItem>
									);
								})}
							</Select>
							<Select
								className="date"
								name="year"
								id=""
								value={year}
								onChange={(ev) => setYear(ev.target.value)}
							>
								{day(1950, 2022).map((da) => {
									return (
										<MenuItem key="y" value={da}>
											{da}
										</MenuItem>
									);
								})}
							</Select>
						</Box>

						<input
							type="text"
							disabled
							name="birthdate"
							value={additional?.birth}
							placeholder="Date of Birth"
						/>
						{iserror && (
							<Box>
								<p
									className=""
									style={{
										width: '60%',
										margin: '-.3rem 1rem .8rem 4rem',
										height: '.91rem',
										color: 'red',
										fontFamily: 'ariel',
									}}
								>
									{error}
								</p>
							</Box>
						)}
						{!success && (
							<Box>
								<p
									className=""
									style={{
										width: '60%',
										margin: '-.3rem 1rem .8rem 4rem',
										height: '.91rem',
										color: 'lightblue',
										fontFamily: 'ariel',
										fontSize: '1rem !important',
									}}
								>
									{successmessage}
								</p>
							</Box>
						)}
						<Button
							variant="outlined"
							sx={{ margin: 'auto 45% auto 36%' }}
						>
							{loading ? (
								<CircularProgress
									size="20px"
									sx={{ color: 'white' }}
								/>
							) : (
								'Proceed'
							)}
						</Button>
					</form>
				</Box>
			</Box>
		</Stack>
	);
};

export default CreateName;

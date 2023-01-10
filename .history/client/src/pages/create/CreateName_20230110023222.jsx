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

	const [otherDate, setOtherdate] = useState({
		day: '01',
		month: '01',
		year: '2022',
	});
	const [additional, setAdditional] = useState({
		bsname: '',
		birth: `${otherDate.day}/${otherDate.month}/${otherDate.year}`,
	});

	const handleChange = (ev) => {
		setAdditional((prev) => {
			return { ...prev, [ev.target.name]: ev.target.value };
		});
	};
	const handleNewChange = (ev) => {
		setOtherdate((prev) => {
			return { ...prev, [ev.target.name]: ev.target.value };
		});
	};
	const add = useRef();
	const id = JSON.parse(window.localStorage.getItem('profile'));
	const additional_data = { add, userId: id?.result?._id };
	const navigate = useNavigate();

	const register = useCallback(
		(ev) => {
			ev.preventDefault();
			console.log(add);
			if (add?.current?.bsname && add?.current?.birth) {
				createAdditional(
					setMainContext,
					additional_data,
					success,
					successmessage,
					loading,
					navigate,
				);
			} else {
				setTimeout(() => {
					setMainContext({
						type: 'REMOVEERROR',
						payload: { iserror, error: '' },
					});
				}, 2000);
				setMainContext({
					type: 'REGERROR',
					payload: { iserror, error: 'All fields must be entered' },
				});
			}
		},
		[setMainContext],
	);
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
						<Box className="name">
							{' '}
							<label className="form-label text-light mx-3 fs-6">
								{' '}
								Bussiness/Company Name
							</label>
							<input
								type="text"
								name="bsname"
								value={additional?.bsname}
								placeholder="Bussiness/Company Name"
								onChange={handleChange}
								required
							/>
						</Box>

						<label className="form-label text-light mx-3 fs-6">
							{' '}
							Date of Birth
						</label>
						<Box className="datey">
							{' '}
							<Box className="inputs">
								<input
									type="text"
									value={otherDate.day}
									onChange={handleNewChange}
									name="day"
								/>
							</Box>
							<Box className="inputs">
								<input
									type="text"
									value={otherDate.month}
									onChange={handleNewChange}
									name="month"
								/>{' '}
							</Box>
							<Box className="inputs">
								<input
									id="Date"
									type="text"
									value={otherDate.year}
									onChange={handleNewChange}
									name="year"
								/>
							</Box>
						</Box>

						<input
							type="text"
							value={additional.birth}
							onChange={handleChange}
							name="birthdate"
							disabled
							style={{
								opacity: 0,
								marginBottom: '-1rem',
								height: '.4rem',
							}}
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
						{success && (
							<Box>
								<h4
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
								</h4>
							</Box>
						)}
						{!success && (
							<Button
								type="submit"
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
						)}
					</form>
				</Box>
			</Box>
		</Stack>
	);
};

export default CreateName;

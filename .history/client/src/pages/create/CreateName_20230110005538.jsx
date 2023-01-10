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
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
const CreateName = () => {
	const {
		main: { iserror, error, success, successmessage, loading },
		setMainContext,
	} = useMainContext();

	const [date, setDate] = useState('2000');
	const [additional, setAdditional] = useState({
		bsname: '',
		birth: `${date}`,
	});

	const handleChange = (ev) => {
		setAdditional((prev) => {
			return { ...prev, [ev.target.name]: ev.target.value };
		});
	};
	const add = useRef();
	const id = JSON.parse(window.localStorage.getItem('profile'));
	const additional_data = { add, userId: id?.result?._id };
	const navigate = useNavigate();
	console.log(add);
	const register = useCallback(
		(ev) => {
			ev.preventDefault();

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
	const [value, setValue] = React.useState(
		dayjs('2014-08-18T21:11:54'),
	);

	const handleNewChange = (newValue) => {
		setValue(newValue);
	};
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
							onChange={handleChange}
							required
						/>
						// id="Date" // type="date" // value={date}
						// min="01/" // onChange={(e) => setDate(e.target.value)}
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<Stack spacing={3}>
								<MobileDatePicker
									label="Date mobile"
									inputFormat="MM/DD/YYYY"
									value={value}
									onChange={handleNewChange}
									renderInput={(params) => <TextField {...params} />}
								/>
							</Stack>
						</LocalizationProvider>
						// name="birthdate" //
						<input
							type="text"
							disabled
							name="birthdate"
							value={additional?.birth}
							placeholder="Date of Birth"
							onChange={handleChange}
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

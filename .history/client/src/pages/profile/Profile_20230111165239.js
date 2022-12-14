import React, { useState, useCallback, useRef } from 'react';
import {
	Button,
	Box,
	Stack,
	Typography,
	TextField,
} from '@mui/material';
import { useMainContext } from '../../context/context_/MainContext';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VisibilityOn from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
	Main,
	Left_Bar,
	Image_Data,
	MainStack,
	Profile_Data,
	Validate,
} from './styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import { motion } from 'framer-motion';
import CircularProgress from '@mui/material/CircularProgress';
import logo from '../../assets/lohin.jpg';
import { useGameContext } from '../../context/context_/GameContext';
import {
	update_user,
	delete_user,
} from '../../context/actions/user_actions';
import './profile.css';
import Modal from './Modal';
import EditIcon from '@mui/icons-material/Edit';
import {
	useNavigate,
	useParams,
	Navigate,
	useLocation,
} from 'react-router-dom';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
const Profile = () => {
	const [image, setImage] = useState();

	const prevData = useRef({});
	const {
		main: {
			istheme,
			loading,
			ismodal,
			success,
			modalcontent,
			updated_user,
			loader,
			disabled,
			disablepass,
			showValidate,
		},
		setMainContext,
	} = useMainContext();

	const navigate = useNavigate();

	const [prof, setProf] = useState({
		username: '',
		email: ' ',
		marital: '',
		bsname: '',
		occupation: '',
		city: '',
		password: '',
		confirmpassword: '',
	});

	const [passw, setPassword] = useState(false);
	const [isDataChanged, setChanged] = useState(false);

	const handleChange = (ev) => {
		ev.preventDefault();
		// const fieldname = ev.target.getAttribute('name');
		// const fieldvalue = ev.target.value;
		// const newformData = { ...prof };
		// newformData[fieldname] = fieldvalue;

		setProf(() => {
			return { ...prof, [ev.target.name]: ev.target.value };
		});
	};

	const { id } = useParams();
	// Update function
	const update_acc = useCallback((ev) => {
		const formData = new FormData();
		formData.append('username', prevData.current.username);
		formData.append('email', prevData.current.email);
		formData.append('bsname', prevData.current.bsname);
		formData.append('marital', prevData.current.marital);
		formData.append('occupation', prevData.current.occupation);
		formData.append('city', prevData.current.city);
		formData.append('password', prevData.current.username);
		formData.append(
			'confirmpassword',
			prevData.current.confirmpassword,
		);
		formData.append('image', prevData.current.image);
		const myprofile = { FormData, userId: id };
		console.log(myprofile);
		ev.preventDefault();
		if (prevData?.current?.username && prevData?.current?.email) {
			if (
				prevData?.current?.password ===
				prevData?.current?.confirmpassword
			) {
				update_user(
					setMainContext,
					loading,
					myprofile,
					id,
					ismodal,
					success,
					navigate,
				);
			} else {
				setMainContext({ type: 'WRONG_PASSWORD' });
			}
		} else {
			setMainContext({ type: 'NO_DATA' });
		}
	}, []);

	// Delete function

	const delete_acc = useCallback((ev) => {
		ev.preventDefault();

		const myprofile = {
			prevData,
			userId: id,
		};

		delete_user(
			setMainContext,
			loading,
			myprofile,
			id,
			ismodal,
			success,
			navigate,
			setDisabled,
		);
	}, []);
	const [allprof, setDataProfile] = useState({});
	const profile = useRef();

	// Get User Data
	const getUserData = async (ev) => {
		const baseUrl = 'https://gaminhub.herokuapp.com';

		try {
			const response = await axios.get(`${baseUrl}/user/v2/${id}`);
			console.log(response?.data);
			setDataProfile(response?.data);
			setProf({
				username: response?.data?.username,
				email: response?.data?.email,
				bsname: response?.data?.bsname,
				marital: response?.data?.marital || '',
				occupation: response?.data?.occupation,
				city: response?.data?.city,
				package: response?.data?.package,
				bsname: response?.data?.bsname,
				password: response?.data?.password,
				confirmpassword: response?.data?.password,
			});
			setImage(response?.data?.profilepicture);
		} catch (error) {
			console.log(error.message);
		}
	};
	// Loader UseEffect
	const [progress, setProgress] = React.useState(10);

	React.useEffect(() => {
		const timer = setInterval(() => {
			setProgress((prevProgress) =>
				prevProgress >= 100 ? 0 : prevProgress + 10,
			);
		}, 450);

		return () => {
			clearInterval(timer);
		};
	}, []);

	React.useEffect(() => {
		profile.current = allprof;
		prevData.current = prof;
	}, [prof]);
	const closemodal = () => {
		setMainContext({ type: 'CLOSEMODAL', ismodal });
	};

	const [disable, setDisabled] = useState(false);

	React.useEffect(() => {
		console.log(image, 12);
		getUserData();
	}, [image]);

	return (
		<Stack sx={{ background: 'white', minHeight: '85vh !important' }}>
			<MainStack className="profile">
				<Left_Bar>
					<Image_Data>
						<h4>Change Profile Picture</h4>
						<Box
							sx={{
								height: '20em',
								width: '100%',
								background: 'rgb(20, 22, 52)',
								marginBottom: '2.6rem',
							}}
						>
							<img src={image?.name} />
							<span>
								<label htmlFor="dp_image">
									<AddAPhotoIcon
										sx={{
											color: 'white',
											fontSize: '2rem',
											cursor: 'pointer',
										}}
									/>
								</label>
							</span>
							<input
								id="dp_image"
								style={{
									display: 'none',
								}}
								multiple
								onChange={(e) => setImage(e.target.files[0])}
								type="file"
							/>
						</Box>
						<Box
							sx={{
								color: 'lightgrey',
								padding: '.4rem',
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<>
								<h5>
									Username:
									<span
										style={{
											color: 'lightgrey',
											opacity: '.6',
											fontSize: '1.5rem',
										}}
									>
										{prof?.username}
									</span>
								</h5>
								<p>
									{' '}
									Email Address:
									<span style={{ color: 'lightgrey', opacity: '.6' }}>
										{' '}
										{prof?.email}
									</span>
								</p>
								<p>
									N/B: A User can Only update their data/information
									only.
								</p>
								<p>
									N/B: An Admin on the Other hand can only delete or
									terminate a user anytime but they cannot edit or
									change any of the user's data.
								</p>
								<Stack
									direction="row"
									sx={{
										padding: '.4rem',
										background: 'maroon',
										width: '50%',
									}}
									onClick={() => navigate('/')}
								>
									{' '}
									<ArrowBackIcon />
									Go Back
								</Stack>
							</>
						</Box>
					</Image_Data>
				</Left_Bar>
				<Main istheme={istheme}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-evenly',
						}}
					>
						<Typography
							variant="h5"
							sx={{
								color: 'red',
								fontSize: '1.3rem !important',
								marginLeft: '1rem',
								marginTop: '.5rem !important',
							}}
							className="head__update"
						>
							Update Info
						</Typography>
						<Button
							disabled={disable}
							variant="outlined"
							color="secondary"
							sx={{
								color: istheme ? 'green' : 'white',
								fontWeight: 'bold',
								marginTop: '.8rem',
								border: '1px solid green',
							}}
							onClick={() => setDisabled((prev) => !prev)}
							className="head__update"
						>
							Edit Profile
							<EditIcon />
						</Button>
					</Box>

					{ismodal && (
						<Modal
							modalcontent={modalcontent}
							closemodal={closemodal}
							success={success}
						/>
					)}
					<Box
						className="container-fluid"
						sx={{
							marginTop: '.9rem',
							borderLeft: '1px solid lightgrey',
							height: '73vh',
							paddingTop: '.2rem',
							background: istheme ? 'white' : 'black',
						}}
					>
						<Profile_Data disabled={disable} className="form-group">
							<TextField
								disabled={!disable}
								InputLabelProps={{
									shrink: true,
									style: {
										color: istheme ? 'grey' : 'grey',
										marginLeft: '.5rem',
										pointerEvents: 'none',
									},
								}}
								name="username"
								labelid="demo-simple-select-standard-label"
								id="demo-simple-select-standard"
								variant="standard"
								label="Username"
								sx={{
									color: 'white',
									width: '100%',
									borderLeft: !istheme ? '2px solid grey' : 'none',
									borderBottom: '1px solid lightgrey',
								}}
								inputProps={{
									style: {
										color: !istheme
											? disabled
												? 'black'
												: 'white'
											: 'white',
										marginLeft: '.5rem',
									},
								}}
								value={prof?.username || ''}
								onChange={handleChange}
								type="text"
							/>
						</Profile_Data>
						<Profile_Data disabled={disable}>
							<TextField
								disabled={!disable}
								InputLabelProps={{
									shrink: true,
									style: {
										color: istheme ? 'grey' : 'grey',
										marginLeft: '.5rem',
									},
								}}
								name="email"
								labelid="demo-simple-select-standard-label"
								id="demo-simple-select-standard"
								variant="standard"
								label="Email Address"
								sx={{
									color: 'white',
									width: '100%',
									borderLeft: !istheme ? '2px solid grey' : 'none',
									borderBottom: '1px solid lightgrey',
								}}
								inputProps={{
									style: {
										marginLeft: '.5rem',
										color: !istheme
											? disabled
												? 'black'
												: 'white'
											: 'white',
									},
								}}
								value={prof?.email || ''}
								onChange={handleChange}
							/>
						</Profile_Data>
						<Profile_Data disabled={disable}>
							<TextField
								disabled={!disable}
								InputLabelProps={{
									shrink: true,
									style: {
										color: istheme ? 'grey' : 'grey',
										marginLeft: '.5rem',
									},
								}}
								name="bsname"
								labelid="demo-simple-select-standard-label"
								id="demo-simple-select-standard"
								variant="standard"
								label="Business Name"
								sx={{
									color: 'white',
									width: '100%',
									borderLeft: !istheme ? '2px solid grey' : 'none',
									borderBottom: '1px solid lightgrey',
								}}
								inputProps={{
									style: {
										marginLeft: '.5rem',
										color: !istheme
											? disabled
												? 'black'
												: 'white'
											: 'white',
									},
								}}
								value={prof?.bsname || ''}
								onChange={handleChange}
							/>
						</Profile_Data>
						<Profile_Data disabled={disable}>
							<TextField
								disabled={!disable}
								InputLabelProps={{
									shrink: true,
									style: {
										color: istheme ? 'grey' : 'grey',
										marginLeft: '.5rem',
									},
								}}
								name="marital"
								labelid="demo-simple-select-standard-label"
								id="demo-simple-select-standard"
								variant="standard"
								label="Marital Status"
								sx={{
									color: 'white',
									width: '100%',
									borderLeft: !istheme ? '2px solid grey' : 'none',
									borderBottom: '1px solid lightgrey',
								}}
								inputProps={{
									style: {
										marginLeft: '.5rem',
										color: !istheme
											? disabled
												? 'black'
												: 'white'
											: 'white',
									},
								}}
								value={prof?.marital || ''}
								onChange={handleChange}
							/>
						</Profile_Data>
						<Profile_Data disabled={disable}>
							<TextField
								disabled={!disable}
								InputLabelProps={{
									shrink: true,
									style: {
										color: istheme ? 'grey' : 'grey',
										marginLeft: '.5rem',
									},
								}}
								name="occupation"
								labelid="demo-simple-select-standard-label"
								id="demo-simple-select-standard"
								variant="standard"
								label="Occupation"
								sx={{
									color: 'white',
									width: '100%',
									borderLeft: !istheme ? '2px solid grey' : 'none',
									borderBottom: '1px solid lightgrey',
								}}
								inputProps={{
									style: {
										marginLeft: '.5rem',
										color: !istheme
											? disabled
												? 'black'
												: 'white'
											: 'white',
									},
								}}
								value={prof?.occupation || ''}
								onChange={handleChange}
							/>
						</Profile_Data>

						<Profile_Data disabled={disable}>
							<TextField
								disabled={!disable}
								InputLabelProps={{
									shrink: true,
									style: {
										color: istheme ? 'grey' : 'grey',
										marginLeft: '.5rem',
									},
								}}
								name="city"
								labelid="demo-simple-select-standard-label"
								id="demo-simple-select-standard"
								variant="standard"
								label="City"
								sx={{
									color: 'white',
									width: '100%',
									borderLeft: !istheme ? '2px solid grey' : 'none',
									borderBottom: '1px solid lightgrey',
								}}
								inputProps={{
									style: {
										marginLeft: '.5rem',
										color: !istheme
											? disabled
												? 'black'
												: 'white'
											: 'white',
									},
								}}
								value={prof?.city || ''}
								onChange={handleChange}
							/>
						</Profile_Data>
						<Button
							style={{ marginTop: '1.6rem' }}
							variant="outlined"
							onClick={() => {
								setMainContext({
									type: 'SETPASSWORD',
									showValidate,
									disablepass,
								});
							}}
						>
							{!showValidate ? 'Change password' : 'Hide Dialogue'}
						</Button>
						<Validate showValidate={showValidate}>
							{showValidate && (
								<div>
									<Profile_Data disabled={disablepass}>
										<Box style={{ display: 'flex' }}>
											<TextField
												disabled={!disablepass}
												InputLabelProps={{
													shrink: true,
													style: {
														color: istheme ? 'grey' : 'grey',
														marginLeft: '.5rem',
													},
												}}
												name="password"
												labelid="demo-simple-select-standard-label"
												id="demo-simple-select-standard"
												variant="standard"
												label="New Password"
												type={!passw ? 'password' : 'text'}
												sx={{
													color: 'white',
													width: '100%',
													borderLeft: !istheme
														? '2px solid grey'
														: 'none',
													borderBottom: '1px solid lightgrey',
												}}
												inputProps={{
													style: {
														marginLeft: '.5rem',
														color: !istheme
															? disabled
																? 'black'
																: 'white'
															: 'black',
													},
												}}
												value={prof?.password || ''}
												onChange={handleChange}
											/>
											{!passw ? (
												<VisibilityOff
													sx={{
														cursor: 'pointer',
														color: !istheme ? 'white' : 'black',
													}}
													onClick={() => {
														setPassword((prof) => !prof);
													}}
												/>
											) : (
												<VisibilityOn
													sx={{
														cursor: 'pointer',
														color: !istheme ? 'white' : 'black',
													}}
													onClick={() => {
														setPassword((prof) => !prof);
													}}
												/>
											)}
										</Box>
									</Profile_Data>

									<Profile_Data disabled={disablepass}>
										<TextField
											disabled={!disablepass}
											InputLabelProps={{
												shrink: true,
												style: {
													color: istheme ? 'grey' : 'grey',
													marginLeft: '.5rem',
												},
											}}
											type={!passw ? 'password' : 'text'}
											name="confirmpassword"
											labelid="demo-simple-select-standard-label"
											id="demo-simple-select-standard"
											variant="standard"
											label="Confirm New Password"
											sx={{
												color: 'white',
												width: '100%',
												borderLeft: !istheme
													? '2px solid grey'
													: 'none',
												borderBottom: '1px solid lightgrey',
											}}
											inputProps={{
												style: {
													marginLeft: '.5rem',
													color: !istheme ? 'white' : 'black',
												},
											}}
											value={prof?.confirmpassword || ''}
											onChange={handleChange}
										/>
									</Profile_Data>
								</div>
							)}
						</Validate>

						<Box style={{ color: 'red', textAlign: 'center' }}></Box>
						<Box
							sx={{
								marginTop: '2rem',
							}}
							className="actions"
						>
							<Button
								disabled={loading || !disable}
								onClick={update_acc}
								variant="outlined"
								sx={{
									background: 'lightblue',
									marginRight: '1rem',
									color: 'green',
								}}
							>
								{loading && (
									<CircularProgressWithLabel
										value={progress}
										size="27px"
										sx={{ marginRight: '.6rem' }}
									/>
								)}
								Update data
							</Button>
							<Button
								onClick={delete_acc}
								variant="contained"
								sx={{ background: 'red' }}
							>
								{loader ? (
									<CircularProgress
										size="20px"
										sx={{ color: 'white' }}
									/>
								) : (
									'Delete Account'
								)}
							</Button>
						</Box>
					</Box>
				</Main>
			</MainStack>
		</Stack>
	);
};

export default Profile;

function CircularProgressWithLabel(props) {
	return (
		<Box sx={{ position: 'relative', display: 'inline-flex' }}>
			<CircularProgress variant="determinate" {...props} />
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: 'absolute',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Typography
					variant="caption"
					component="div"
					color="text.secondary"
				>
					{`${Math.round(props.value)}%`}
				</Typography>
			</Box>
		</Box>
	);
}

CircularProgressWithLabel.propTypes = {
	/**
	 * The value of the progress indicator for the determinate variant.
	 * Value between 0 and 100.
	 * @default 0
	 */
	value: PropTypes.number.isRequired,
};

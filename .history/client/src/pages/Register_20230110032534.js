import React, { useEffect, useState, useRef } from 'react';

import { Link, useNavigate, Navigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useMainContext } from '../context/context_/MainContext';
import { register } from '../redux/features/authSlice';
import {
	CircularProgress,
	Button,
	Box,
	TextField,
	Card,
} from '@mui/material';
const initsate = {
	email: '',
	password: '',
	firstname: '',
	lastname: '',
	confirmpasword: '',
};
const Register = ({ authorize }) => {
	const {
		main: { auth, errorm, mymess, loading, additional },
		setMainContext,
	} = useMainContext();
	const [formval, setFormval] = useState(initsate);
	const [checked, setChecked] = useState(false);
	const { error } = useSelector((state) => ({
		...state.auth,
	}));
	const [err, setError] = useState('');
	const { email, password, firstname, lastname, confirmpassword } =
		formval;
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const handleSubmit = (ev) => {
		ev.preventDefault();
		if (password !== confirmpassword) {
			return toast.error('Password should match');
		}
		if (
			email &&
			password &&
			firstname &&
			lastname &&
			confirmpassword
		) {
			dispatch(
				register({ formval, navigate, toast, setMainContext }),
			);
		} else {
			setMainContext({
				type: 'EMPTY',
				message: 'All field should be entered',
			});
		}
	};
	const oncInputChange = (ev) => {
		let { name, value } = ev.target;
		setFormval({ ...formval, [name]: value });
	};

	return (
		<div
			className="mainreg"
			style={{
				margin: 'auto',
				padding: '15px',
				maxWidth: '450px',
				alignContent: 'center',
				marginTop: '50px',
				minHeight: '80vh',
			}}
		>
			<Card alignment="center" className="hreg">
				<h1
					align="center"
					style={{
						color: 'greenyellow',
						fontWeight: 'bold',
						marginBottom: '-.8rem',
						marginTop: '.7rem',
					}}
				>
					Sign Up
				</h1>
				<Box className="reg">
					<form
						onSubmit={handleSubmit}
						noValidate
						className="row g-3 p-2"
					>
						<div className="col-md-12 form-group ">
							{' '}
							<TextField
								label="Firstname"
								type="text"
								value={firstname}
								name="firstname"
								onChange={oncInputChange}
								className="form-control "
								sx={{
									margin: 'auto 1rem 1rem auto',
									height: '-1.4rem !important',
								}}
								required
								variant="standard"
								InputLabelProps={{
									style: {
										marginLeft: '.5rem',
										color: 'green',
									},
								}}
							/>
						</div>
						<div className="col-md-12 form-group  ">
							{' '}
							<TextField
								label="Lastname"
								type="text"
								value={lastname}
								name="lastname"
								onChange={oncInputChange}
								className="form-control"
								sx={{ margin: 'auto 1rem 1rem auto' }}
								required
								variant="standard"
								InputLabelProps={{
									style: {
										marginLeft: '.5rem',
										color: 'green',
									},
								}}
							/>
						</div>
						<div className="col-md-12 form-group  ">
							{' '}
							<TextField
								label="Email"
								type="email"
								value={email}
								name="email"
								onChange={oncInputChange}
								className="form-control "
								sx={{ margin: 'auto 1rem 1rem auto' }}
								required
								variant="standard"
								InputLabelProps={{
									style: {
										marginLeft: '.5rem',
										color: 'green',
									},
								}}
							/>
						</div>
						<div className="col-md-12 form-group ">
							{' '}
							<TextField
								label="Password"
								type={!checked ? 'password' : 'text'}
								value={password}
								name="password"
								onChange={oncInputChange}
								className="form-control"
								sx={{ margin: 'auto 1rem 1rem auto' }}
								required
								variant="standard"
								InputLabelProps={{
									style: {
										marginLeft: '.5rem',
										color: 'green',
									},
								}}
							/>
						</div>
						<div className="col-md-12 form-group  ">
							{' '}
							<TextField
								label="Confirm Password"
								type={!checked ? 'password' : 'text'}
								value={confirmpassword}
								name="confirmpassword"
								onChange={oncInputChange}
								className="form-control"
								sx={{ margin: 'auto 1rem 1rem auto' }}
								required
								variant="standard"
								InputLabelProps={{
									style: {
										marginLeft: '.5rem',
										color: 'green',
									},
								}}
							>
								{' '}
							</TextField>
						</div>
						<div
							className="col-md-12 form-group  mt-2 mx-5"
							style={{ height: '.2rem' }}
						>
							{' '}
							<input
								style={{
									textAlign: 'left',
									width: '2.5rem !important',
									height: '2.2rem !important',
								}}
								className="form-check-input"
								type="checkbox"
								name="check"
								onChange={(ev) => setChecked(!checked)}
							/>
							:{!checked ? 'Show Password' : 'Hide Password'}
						</div>
						{errorm ? (
							<p style={{ color: 'red', marginTop: '10px' }}>
								{mymess}
							</p>
						) : (
							''
						)}
						<div className="col-12">
							<Button
								type="submit"
								variant="contained"
								style={{ width: '100%' }}
								className={
									err ? 'btn-primary' : 'mt-4 btn btn-primary'
								}
							>
								{loading ? (
									<CircularProgress
										size="20px"
										sx={{ color: 'white' }}
									/>
								) : (
									'Register'
								)}
							</Button>
						</div>
					</form>
				</Box>
				<Box>
					<Link to="/login" className="text-secondary">
						<p style={{ textAlign: 'center' }}>
							Already have an account? Sign in
						</p>
					</Link>
				</Box>
			</Card>
		</div>
	);
};

export default Register;

import axios from 'axios';

const API = axios.create({
baseUrl:process.env.REACT_APP_BASE;
});

export const signin = (formdata) =>
	API.post('/users/login', formdata);
export const signup = (formdata) =>
	API.post('/users/register', formdata);
export const googleSignin = (result) =>
	API.post('/users/googleSignIn', result);

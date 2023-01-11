import axios from 'axios';

const API = axios.create({
	baseUrl: 'http://lopocalhost:8000',
});

export const signin = (formdata) =>
	API.post('/users/login', formdata);
export const signup = (formdata) =>
	API.post('/users/register', formdata);
export const googleSignin = (result) =>
	API.post('/users/googleSignIn', result);

import axios from 'axios';

const API = axios.create({
	baseUrl: process.env.REACT_APP_BASE,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});
export default API;

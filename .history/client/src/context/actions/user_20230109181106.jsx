import axios from 'axios';

export const createAdditional = async (
	setMainContext,
	additional_data,
	success,
	successmessage,
	loading,
) => {
	let baseUrl = 'https://gaminhub.herokuapp.com';

	let response = axios.put(
		`${baseUrl}/users/additional`,
		additional_data,
	);
	setTimeout(() => {}, 3000);
	setMainContext({
		type: 'SUCESSADD',
		payload: { successmessage: response?.data?.message },
	});
};

import axios from 'axios';

export const createAdditional = async (
	setMainContext,
	additional_data,
	success,
	loading,
) => {
	let baseUrl = 'https://gaminhub.herokuapp.com';

	try {
		let response = axios.put(
			`${baseUrl}/users/additional`,
			additional_data,
		);
		setTimeout(() => {
			setMainContext({
				type: 'SUCESSADD',
				payload: {
					successmessage: response?.data?.message,
					success,
					loading,
				},
			});
		}, 3000);
		setMainContext({
			type: 'LOADING',

			loading,
		});
	} catch (error) {
		console.log(error);
	}
};

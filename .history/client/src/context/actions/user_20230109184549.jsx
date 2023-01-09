import { NavigateBefore } from '@mui/icons-material';
import axios from 'axios';

export const createAdditional = async (
	setMainContext,
	additional_data,
	success,
	loading,
) => {
	let baseUrl = 'https://gaminhub.herokuapp.com';

	const bsname = additional_data?.add?.current?.bsname;
	try {
		let response = axios.put(
			`${baseUrl}/users/additional`,
			additional_data,
		);
		setTimeout(() => {
			setTimeout(() => {
				setTimeout(() => {
					NavigateBefore('/v2/package-plan');
				}, 1500);
				setMainContext(
					{
						type: 'ALLADDED',
						payload: {
							success: success,
							successmessage: `Welcome ${bsname}`,
						},
					},
					2000,
				);
			}, 2000);
			setMainContext({
				type: 'SUCESSADD',
				payload: {
					successmessage: response?.data?.message,
				},
			});
		}, 3000);
		setMainContext({
			type: 'LOADING',
			payload: { loading: loading },
		});
	} catch (error) {
		setMainContext({
			type: 'ERROR',
		});
	}
};

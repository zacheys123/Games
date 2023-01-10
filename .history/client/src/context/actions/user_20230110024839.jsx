import axios from 'axios';

export const createAdditional = async (
	setMainContext,
	additional,
	success,
	loading,
	navigate,
) => {
	let baseUrl = 'http://localhost:8000';

	const bsname = additional?.add?.current?.bsname;
	const id = additional?.userId;
	try {
		let response = axios.put(
			`${baseUrl}/users/additional/${id}`,
			additional,
		);

		setTimeout(() => {
			setTimeout(() => {
				setTimeout(() => {
					navigate('/v2/package-plan');
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
				type: 'SUCCESSADD',
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

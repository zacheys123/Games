import axios from 'axios';

export const createAdditional = async (
	setMainContext,
	addit,
	success,
	loading,
	navigate,
) => {
	let baseUrl = 'http://localhost:8000';

	const bsname = addit?.add?.current?.bsname;
	const id = addit?.userId;
	try {
		let response = axios.put(
			`${baseUrl}/users/additional/${id}`,
			addit,
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

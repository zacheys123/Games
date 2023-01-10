import axios from 'axios';

export const createAdditional = async (
	setMainContext,
	addit,
	success,
	nav,
	setLoading,
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
					nav('/v2/package-plan');
					window.location.reload();
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
			setLoading(false);
		}, 3000);

		setLoading(true);
	} catch (error) {
		setMainContext({
			type: 'ERROR',
		});
	}
};

import axios from 'axios';

export const createAdditional = async (
	setMainContext,
	addit,
	success,
	nav,
	setLoading,
	additional,
) => {
	const baseUrl = 'https://gaminhub.herokuapp.com';

	const bsname = addit?.add?.current?.bsname;
	const id = addit?.userId;
	try {
		let response = await axios.post(
			`${baseUrl}/users/additional/${id}`,
			addit,
		);

		setTimeout(() => {
			setTimeout(() => {
				setTimeout(() => {
					window.location.reload();
				}, 1500);
				setMainContext({
					type: 'ALLADDED',
					payload: {
						success: success,
						successmessage: `Welcome ${bsname}`,
						additional,
					},
				});
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

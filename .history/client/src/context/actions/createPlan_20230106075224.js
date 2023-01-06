import axios from 'axios';
const baseUrl = process.env.REACT_APP_HOST;
export const createPlan = async (
	plan,
	navigate,
	loading,
	setMainContext,
) => {
	try {
		if (plan.userId) {
			if (plan?.free?.length > 0) {
				console.log(plan?.free);
				setTimeout(() => {
					setMainContext({ type: 'PLAN' });
					navigate('/');
					window.location.reload();
				}, 2000);

				await axios.put(
					`${baseUrl}/user/v2/package/${plan.userId}`,
					plan,
				);
			} else {
				console.log('No Value Entered');
			}
		} else {
			console.log('No UserId');
		}
	} catch (error) {
		setTimeout(() => {
			navigate('/package-plan');
		}, 2000);
		setMainContext({ type: 'PLAN_ERROR', loading });
	}
};

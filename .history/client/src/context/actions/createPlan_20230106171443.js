import axios from 'axios';
const baseUrl = 'http://localhost:8000';
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
					setTimeout(() => {
						window.location.reload();

						setMainContext({ type: 'PLAN' });
					}, 2500);

					navigate('/');
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
			navigate('/v2/package-plan');
		}, 2000);
		setMainContext({ type: 'PLAN_ERROR', loading });
	}
};

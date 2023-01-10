import { useMainContext } from '../context/context_/MainContext';
const Footer = () => {
	const {
		main: { addition, showValidate },
	} = useMainContext();
	return (
		<>
			{showValidate && (
				<footer className="text-center " style={{ minHeight: '6vh' }}>
					<div
						className="text-center p-3"
						style={{ backgroundColor: 'rgba(233, 340, 430, 0.8)' }}
					>
						© 2020 Copyright:
						<a className="text-dark" href="/">
							GameHub.com
						</a>
					</div>
				</footer>
			)}
		</>
	);
};

export default Footer;

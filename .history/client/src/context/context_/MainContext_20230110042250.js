import React, { useContext, createContext, useReducer } from 'react';

import { mainreducer } from '../reducers/mainreducer';

const initialState = {
	authorize: false,
	auth: false,
	istheme: false,
	currentuser: { email: '' },
	loading: false,
	modalsuccess: null,
	ismodal: false,
	contact: false,
	descr: false,
	data_feed: {},
	iserror: false,
	error: '',
	success: false,
	successmessage: 'Welcome to Gamehub ',
	modalcontent: '',
	currentUser: '',
	updated_user: {},
	loader: false,
	disabled: false,
	overlay: false,
	plan: true,
	mymess: '',
	userInfo: '',
	free: false,
	amateur: false,
	world: false,
	premium: false,
	showmenu: false,
	prof_data: {},
	addition: false,
	showValidate: false,
};
const MainProvider = createContext(initialState);
const MainContext = ({ children }) => {
	const [main, setMainContext] = useReducer(
		mainreducer,
		initialState,
	);
	let value = { main, setMainContext };
	return (
		<MainProvider.Provider value={value}>
			{children}
		</MainProvider.Provider>
	);
};

export default MainContext;

export const useMainContext = () => {
	const context = useContext(MainProvider);
	if (!context) {
		throw new Error('UseMainContext can only be used in children');
	}
	return context;
};

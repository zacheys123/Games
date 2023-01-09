import express from 'express';
import {
	register,
	login,
	forgotpassword,
	googleSignin,
	resetpassword,
	users,
	additional,
} from '../controllers/user.js';
const router = express.Router();

router.route('/register').post(register);
router.route('/additional').post(additional);
router.route('/login').post(login);
router.route('/').post(users);
router.route('/googleSignin').post(googleSignin);

router.route('/forgotpassword').post(forgotpassword);

router.route('/resetpassword/:resettoken').put(resetpassword);

export default router;

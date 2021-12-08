import { Router } from 'express';
import { testCheck, registerUser, loginUser, forgotPassword, changePassword } from '../controllers/authController';
import { loginValidator, registrationValidator, changePasswordValidator, forgotPasswordValidator, deleteUser } from '../policy/auth.policy';
import { validate } from '../helpers/validate';
import { authChecker } from '../middleware/authChecker'

const router: Router = Router();

router.get('/ping', testCheck); // test route

router.post('/register', authChecker, validate(registrationValidator), registerUser); // create new user in the application

router.post('/login', authChecker, validate(loginValidator), loginUser); // log user into the appplication

router.post('/forgot-password', validate(forgotPasswordValidator), forgotPassword); // request token for password change

router.post('/change-password', validate(changePasswordValidator), changePassword); // change user's password 

router.put('/edit/:id/email', loginUser); // edit a user's email

router.delete('/delete/:id', validate(deleteUser), forgotPassword); // delete a client in the database

export = router;

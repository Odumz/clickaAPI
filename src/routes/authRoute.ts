import { Router } from 'express';
import {
    testCheck,
    registerUser,
    loginUser,
    editEmail, 
    removeUser,
    sendForgotPasswordVerification,
    ForgotPasswordVerification,
    sendMailVerification,
    mailVerification
} from '../controllers/authController';
import { loginValidator, registrationValidator, tokenValidator, emailValidator, deleteUser, changePasswordValidator } from '../policy/auth.policy';
import { validate } from '../helpers/validate';
import { authChecker } from '../middleware/authChecker'

const router: Router = Router();

router.get('/ping', testCheck); // test route

router.post('/register', validate(registrationValidator), registerUser); // create new user in the application

router.post('/login', validate(loginValidator), loginUser); // log user into the appplication

router.post('/forgot-password', validate(emailValidator), sendForgotPasswordVerification); // request token for password change

router.post('/send-verification-email', validate(emailValidator), sendMailVerification); // request token for password change

router.post('/verify-email', validate(tokenValidator), mailVerification); // request token for password change

router.post('/change-password', validate(changePasswordValidator), ForgotPasswordVerification); // change user's password 

router.post('/edit/:id/email', validate(emailValidator), editEmail); // edit a user's email

router.delete('/delete/:id', validate(deleteUser), removeUser); // delete a client in the database

export = router;

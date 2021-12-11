import { Request, Response, NextFunction, RequestHandler } from 'express';
import { register, login, forgetPassword, editPassword, sendVerificationMail, verifyUserMail } from '../services/authService';
import catchAsync from '../helpers/catchAsync';
import pick from '../helpers/pick';

// test route controller definition
const testCheck: RequestHandler = (req: Request, res: Response) => {
    res.status(200).send({
        message: 'Auth route testCheck'
    });
};

// add a client route controller definition
const registerUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const user:any = await register(req, res);

    res.status(201).send({
        message: 'User successfully created',
        ...user
    });
});

// update a client route controller definition
const loginUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const user:any = await login(req, res);

    res.status(200).send({
        message: 'User successfully logged in',
        ...user
    });
});

// update a client route controller definition
const changePassword: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const user:any = await editPassword(req, res);

    res.status(200).send({
        message: 'User successfully logged in',
        ...user
    });
});

// delete a client route controller definition
const forgotPassword: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const user: any = await forgetPassword(req, res);

    res.status(200).send({
        message: 'Client successfully deleted',
        user
    });
});

// send email verification controller definition
const sendMailVerification: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const user: any = await sendVerificationMail(req, res);

    res.status(200).send({
        message: 'Verification email successfully sent',
        user
    });
});

// send email verification controller definition
const mailVerification: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const user: any = await verifyUserMail(req, res);

    res.status(200).send({
        message: 'User email successfully verified',
        user
    });
});

export { testCheck, changePassword, registerUser, loginUser, forgotPassword, sendMailVerification, mailVerification };

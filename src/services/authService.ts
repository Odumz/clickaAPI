import ApiError from '../helpers/ApiError';
import { Request, Response, RequestHandler } from 'express';
import IUser from 'interfaces/user';
import User from '../models/user';
import bcrypt from 'bcrypt';
import { randomStringGenerator } from '../helpers/filter'
import { createToken, verifyToken } from '../helpers/jwtServices';
import { transporter, FRONTENDURL } from 'config/config';
import nodemailer from 'nodemailer'

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;

        const existingUser = await User.findOne({ email: data.email });

        if (existingUser) {
            throw new ApiError(422, 'User with this email exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 8)

        const newData:any = {...req.body, password: hashedPassword}
        
        const user: IUser = await User.create(newData);

        const token:string = await createToken(user)

        res.cookie('jwt', token)
        
        const details:any = await { user, token }
        
        return details;

        // return JSON.parse(JSON.stringify(user));
    } catch (err: any) {
        throw new ApiError(err.statusCode || 500, err.message || err);
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;

        const user = await User.findOne({ email: data.email });

        if (!user) {
            throw new ApiError(401, 'Email or password is incorrect');
        }

        const isValidPassword = await bcrypt.compare(data.password, user.password);

        if (!isValidPassword) {
            throw new ApiError(401, 'Email or password is incorrect');
        }

        const token:string = await createToken(user);

        res.cookie('jwt', token);

        const details:any = await { user, token }
        console.log(details);
        
        return details;
        // res.send(details);

        // return JSON.parse(JSON.stringify(user));
    } catch (err: any) {
        throw new ApiError(err.statusCode || 500, err.message || err);
    }
};

export const forgetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;

        // console.log('data', data);

        const user = await User.findOne({ email: data.email });

        // const user: IUser | null = await User.findById(criteria).select('firstname lastname email phone');

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        const passwordResetToken = await randomStringGenerator(35)

        console.log('password reset token is: ', passwordResetToken);

        console.log("You'll get an email at :", data.email);

        // return JSON.parse(JSON.stringify(user));
    } catch (error: any) {
        throw new ApiError(error.statusCode || 500, error.message || error);
    }
};

export const editPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;

        console.log('data', data);

        // const user = await User.findOne({ email: data.email });

        // const user: IUser | null = await User.findById(criteria).select('firstname lastname email phone');

        // if (!user) {
        //     throw new ApiError(404, 'User not found');
        // }

        console.log("You'll get an email at :", data.email);

        // return JSON.parse(JSON.stringify(user));
    } catch (error: any) {
        throw new ApiError(error.statusCode || 500, error.message || error);
    }
};

export const remove = async (userId: string): Promise<void> => {
    try {
        let user: IUser | null = await User.findByIdAndRemove(userId);

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        return JSON.parse(JSON.stringify(user));
    } catch (error: any) {
        throw new ApiError(error.statusCode || 500, error.message || 'error');
    }
};

export const sendVerificationMail: RequestHandler = async (req, res, next) => {
    const data = req.body;
    try {
        const user: IUser | null = await User.findOne({ email: data.email });

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        if (user.isVerified) {
            throw new ApiError(406, 'User already verified');
        }

        const encryptedToken = await bcrypt.hash(user.id.toString(), 8);

        const token: string = await createToken(user.id, '60m');

        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <anshuraj@dosomecoding.com>', // sender address
            to: `${user.email}`, // list of receivers
            subject: 'For Email Verification', // Subject line
            // text: "Hello world?", // plain text body
            html: `Your Verification Link <a href="${FRONTENDURL}/email-verify/${token}">Link</a>` // html body
        });

        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        await user.updateOne({ $set: { verifyToken: encryptedToken } });
        res.json({
            message: `Preview URL: %s ${nodemailer.getTestMessageUrl(info)}`
        });
    } catch (error: any) {
        throw new ApiError(error.statusCode || 500, error.message || error);
    }
};

export const verifyUserMail: RequestHandler = async (req, res, next) => {
    const { token }: { token: string } = req.body;

    try {
        const decodedToken: any = verifyToken(token);

        const user = await User.findById(decodedToken.userId);
        if (!user) {
            throw new ApiError(401, 'Token is invalid');
        }

        await user.updateOne({
            $set: { isUserVerified: true },
            $unset: { verifyToken: 0 }
        });

        res.json({ message: 'Email Verified!' });
    } catch (error) {
        throw new ApiError(401, 'Token is invalid');
    }
};

export const sendForgotPasswordMail: RequestHandler = async (req, res, next) => {
    const { email }: { email: string } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(404, 'Email is not valid');
        }

        const encryptedToken = await bcrypt.hash(user._id.toString(), 8);

        const token: string = await createToken(user.id, '60m');

        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <anshuraj@dosomecoding.com>', // sender address
            to: `${email}`, // list of receivers
            subject: 'For Forgot Password Verification Mail', // Subject line
            // text: "Hello world?", // plain text body
            html: `Your Verification for forgot password Link <a href="${FRONTENDURL}/forgot-password-verify/${token}">Link</a>` // html body
        });

        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        await user.updateOne({ $set: { verifyToken: encryptedToken } });

        res.json({
            message: `Preview URL: %s ${nodemailer.getTestMessageUrl(info)}`
        });
    } catch (error: any) {
        throw new ApiError(error.statusCode || 500, error.message || error);
    }
};
export const verifyForgotMail: RequestHandler = async (req, res, next) => {
    const { token, password }: { token: string; password: string } = req.body;

    try {
        const decodedToken: any = verifyToken(token);

        const user = await User.findById(decodedToken.userId);
        if (!user) {
            throw new ApiError(401, 'Token is invalid');
        }

        const encryptedPassword = await bcrypt.hash(password, 8);

        await user.updateOne({
            $set: { password: encryptedPassword },
            $unset: { verifyToken: 0 }
        });

        res.json({ message: 'Password Changed!' });
    } catch (error) {
        throw new ApiError(401, 'Token is invalid');
    }
};
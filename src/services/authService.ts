import ApiError from '../helpers/ApiError';
import { Request, Response, RequestHandler } from 'express';
import IUser from 'interfaces/user';
import User from '../models/user';
import bcrypt from 'bcrypt';
import { randomStringGenerator } from '../helpers/filter'
import { createToken, verifyToken } from '../helpers/jwtServices';

const register = async (req: Request, res: Response): Promise<void> => {
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

const login = async (req: Request, res: Response): Promise<void> => {
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

const listAll = async (options: any = {}, criteria: any = {}): Promise<void> => {
    try {
        let sorter: number = -1;
        let sortOption: any = {};

        // sort results with sort option
        if (options.sortBy) {
            const parts = options.sortBy.split(':');
            sorter = parts[1] === 'asc' ? 1 : 'desc' ? -1 : 1;
            parts[0] === 'firstname'
                ? (sortOption = { firstname: sorter })
                : parts[0] === 'lastname'
                ? (sortOption = { lastname: sorter })
                : parts[0] === 'email'
                ? (sortOption = { email: sorter })
                : parts[0] === 'phone'
                ? (sortOption = { phone: sorter })
                : (sortOption = { createdAt: sorter });
        }

        if (criteria.firstname) {
            const newQuery = criteria.firstname.split(',') || [];
            criteria = { firstname: { $in: newQuery } };
        }

        if (criteria.lastname) {
            const newQuery = criteria.lastname.split(',') || [];
            criteria = { lastname: { $in: newQuery } };
        }

        if (criteria.phone) {
            const newQuery = criteria.phone.split(',') || [];
            criteria = { phone: { $in: newQuery } };
        }

        if (criteria.email) {
            const newQuery = criteria.email.split(',') || [];
            criteria = { email: { $in: newQuery } };
        }

        const { sort = sortOption } = options;

        let users: IUser[] = await User.find(criteria).sort(sort).select('firstname lastname email phone');

        return JSON.parse(JSON.stringify(users));
    } catch (err: any) {
        throw new ApiError(err.statusCode || 500, err.message || err);
    }
};

const forgetPassword = async (req: Request, res: Response): Promise<void> => {
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

const editPassword = async (req: Request, res: Response): Promise<void> => {
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

// const login = async (req: any): Promise<void> => {
//     try {
//         // let user: IUser | null = await User.findByIdAndUpdate(userId, req.body);

//         // if (!user) {
//         //     throw new ApiError(404, 'User not found');
//         // }

//         // const updatedUser = await User.findById(user._id);

//         // return JSON.parse(JSON.stringify(updatedUser));
//         console.log('log in details are: ', req.body);
        
//     } catch (err: any) {
//         throw new ApiError(err.statusCode || 500, err.message || err);
//     }
// };

const remove = async (userId: string): Promise<void> => {
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

export {
    register,
    login,
    listAll,
    forgetPassword,
    editPassword,
    remove
};

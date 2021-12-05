import ApiError from '../helpers/ApiError';
import { Request } from 'express';
import IUser from 'interfaces/user';
import User from '../models/user';

const create = async (req: Request): Promise<void> => {
    try {
        const data = req.body;

        const existingUser = await User.findOne({ email: data.email });

        if (existingUser) {
            throw new ApiError(409, 'User with this email exists');
        }

        const user: IUser = await User.create(data);

        return JSON.parse(JSON.stringify(user));
    } catch (err: any) {
        throw new ApiError(err.statusCode || 500, err.message || err);
    }
};

const listAll = async (options: any = {}, criteria: any = {}) => {
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

        let users: IUser[] = await User.find(criteria)
            .sort(sort)
            .select('firstname lastname email phone');

        return JSON.parse(JSON.stringify(users));
    } catch (err: any) {
        throw new ApiError(err.statusCode || 500, err.message || err);
    }
};

const listOne = async (criteria: string): Promise<void> => {
    try {
        const user: IUser | null = await User.findById(criteria)
            .select('firstname lastname email phone');

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        return JSON.parse(JSON.stringify(user));
    } catch (error: any) {
        throw new ApiError(error.statusCode || 500, error.message || error);
    }
};

const edit = async (userId: string, req: any): Promise<void> => {
    try {
        let user: IUser | null = await User.findByIdAndUpdate(userId, req.body);

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        const updatedUser = await User.findById(user._id);

        return JSON.parse(JSON.stringify(updatedUser));
    } catch (err: any) {
        throw new ApiError(err.statusCode || 500, err.message || err);
    }
};

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

export default {
    create,
    edit,
    listAll,
    listOne,
    remove
};

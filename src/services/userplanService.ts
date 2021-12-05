import ApiError from '../helpers/ApiError';
import { Request } from 'express';
import IUserPlan from 'interfaces/userplan';
import UserPlan from '../models/userplan';

const create = async (req: Request): Promise<void> => {
    try {
        const data = req.body;

        const existingUserPlan = await UserPlan.findOne({ name: data.name });

        if (existingUserPlan) {
            throw new ApiError(409, 'User plan with this name exists');
        }

        const userplan: IUserPlan = await UserPlan.create(data);

        return JSON.parse(JSON.stringify(userplan));
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
            parts[0] === 'name'
                ? (sortOption = { name: sorter })
                : parts[0] === 'price'
                ? (sortOption = { price: sorter })
                : parts[0] === 'phone'
                ? (sortOption = { phone: sorter })
                : (sortOption = { createdAt: sorter });
        }

        if (criteria.name) {
            const newQuery = criteria.name.split(',') || [];
            criteria = { name: { $in: newQuery } };
        }

        if (criteria.price) {
            const newQuery = criteria.price.split(',') || [];
            criteria = { price: { $in: newQuery } };
        }

        if (criteria.email) {
            const newQuery = criteria.email.split(',') || [];
            criteria = { email: { $in: newQuery } };
        }

        const { sort = sortOption } = options;

        let userplans: IUserPlan[] = await UserPlan.find(criteria)
            .sort(sort)
            .select('name features price');

        return JSON.parse(JSON.stringify(userplans));
    } catch (err: any) {
        throw new ApiError(err.statusCode || 500, err.message || err);
    }
};

const listOne = async (criteria: string): Promise<void> => {
    try {
        const userplan: IUserPlan | null = await UserPlan.findById(criteria).select('name features price');

        if (!userplan) {
            throw new ApiError(404, 'User plan not found');
        }

        return JSON.parse(JSON.stringify(userplan));
    } catch (error: any) {
        throw new ApiError(error.statusCode || 500, error.message || error);
    }
};

const edit = async (userId: string, req: any): Promise<void> => {
    try {
        let userplan: IUserPlan | null = await UserPlan.findByIdAndUpdate(userId, req.body);

        if (!userplan) {
            throw new ApiError(404, 'User plan not found');
        }

        const updatedUserPlan = await UserPlan.findById(userplan._id);

        return JSON.parse(JSON.stringify(updatedUserPlan));
    } catch (err: any) {
        throw new ApiError(err.statusCode || 500, err.message || err);
    }
};

const remove = async (userId: string): Promise<void> => {
    try {
        let userplan: IUserPlan | null = await UserPlan.findByIdAndRemove(userId);

        if (!userplan) {
            throw new ApiError(404, 'User plan not found');
        }

        return JSON.parse(JSON.stringify(userplan));
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

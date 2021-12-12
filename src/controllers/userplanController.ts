import { Request, Response, NextFunction } from 'express';
import { create, edit, listAll, listOne, remove } from '../services/userplanService';
import catchAsync from '../helpers/catchAsync';
import pick from '../helpers/pick';

// test route controller definition
const testCheck = (req: Request, res: Response) => {
    res.status(200).send({
        message: 'User plan route testCheck'
    });
};

// get all userplans with conditions route controller definition
const getAllUserPlans = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, ['sortBy']);
    const filter = pick(req.query, ['name', 'features', 'price']);
    const userplans = await listAll(options, filter);
    const count = await userplans.length;
    res.status(200).send({
        status: 'success',
        message: 'User plans successfully fetched',
        data: {
            count,
            userplans
        }
    });
});

// get userplan by ID route controller definition
const getUserPlanByID = catchAsync(async (req: Request, res: Response) => {
    const userplan = await listOne(req.params.id);

    res.status(200).send({
        status: 'success',
        message: 'User plan successfully fetched',
        data: {
            userplan
        }
    });
});

// add a userplan route controller definition
const createUserPlan = catchAsync(async (req: Request, res: Response) => {
    const userplan = await create(req);

    res.status(201).send({
        message: 'User plan successfully created',
        userplan
    });
});

// update a userplan route controller definition
const updateUserPlan = catchAsync(async (req: Request, res: Response) => {
    const updatedUserPlan = await edit(req.params.id, req);

    res.status(200).send({
        message: 'User plan successfully updated',
        updatedUserPlan
    });
});

// delete a userplan route controller definition
const deleteUserPlan = catchAsync(async (req: Request, res: Response) => {
    const deletedUserPlan = await remove(req.params.id);

    res.status(200).send({
        message: 'User plan successfully deleted'
    });
});

export {
    testCheck,
    getAllUserPlans,
    createUserPlan,
    getUserPlanByID,
    updateUserPlan,
    deleteUserPlan
};

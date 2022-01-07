import { Request, Response, NextFunction, RequestHandler } from 'express';
import userService from '../services/userService';
import catchAsync from '../helpers/catchAsync';
import pick from '../helpers/pick';

// test route controller definition
const testCheck:RequestHandler = (req: Request, res: Response) => {
    res.status(200).send({
        message: 'User route testCheck'
    });
};

// get all clients with conditions route controller definition
const getAllUsers:RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, ['sortBy']);
    const filter = pick(req.query, ['name', 'email', 'phone']);
    const clients:any = await userService.listAll(options, filter);
    const count = await clients.length;
    res.status(200).send({
        status: 'success',
        message: 'Users successfully fetched',
        data: {
            count,
            clients
        }
    });
});

// get client by ID route controller definition
const getUserByID:RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const client = await userService.listOne(req.params.id);

    res.status(200).send({
        status: 'success',
        message: 'User successfully fetched',
        data: {
            client
        }
    });
});

// add a client route controller definition
const createUser:RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const client = await userService.create(req);

    res.status(201).send({
        message: 'User successfully created',
        client
    });
});

// update a client route controller definition
const updateUser:RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const updatedUser = await userService.edit(req.params.id, req);

    res.status(200).send({
        message: 'User successfully updated',
        updatedUser
    });
});

// delete a client route controller definition
const deleteUser:RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const deletedUser = await userService.remove(req.params.id);

    res.status(200).send({
        message: 'User successfully deleted'
    });
});

export {
    testCheck,
    getAllUsers,
    createUser,
    getUserByID,
    updateUser,
    deleteUser
};

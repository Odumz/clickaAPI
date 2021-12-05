import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService';
import catchAsync from '../helpers/catchAsync';
import pick from '../helpers/pick';

// test route controller definition
const testCheck = (req: Request, res: Response) => {
    res.status(200).send({
        message: 'client testCheck'
    });
};

// get all clients with conditions route controller definition
const getAllClients = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, ['sortBy']);
    const filter = pick(req.query, ['name', 'email', 'phone']);
    const clients = await userService.listAll(options, filter);
    const count = await clients.length;
    res.status(200).send({
        status: 'success',
        message: 'Clients successfully fetched',
        data: {
            count,
            clients
        }
    });
});

// get client by ID route controller definition
const getClientByID = catchAsync(async (req: Request, res: Response) => {
    const client = await userService.listOne(req.params.id);

    res.status(200).send({
        status: 'success',
        message: 'Client successfully fetched',
        data: {
            client
        }
    });
});

// add a client route controller definition
const createClient = catchAsync(async (req: Request, res: Response) => {
    const client = await userService.create(req);

    res.status(201).send({
        message: 'Client successfully created',
        client
    });
});

// update a client route controller definition
const updateClient = catchAsync(async (req: Request, res: Response) => {
    const updatedClient = await userService.edit(req.params.id, req);

    res.status(200).send({
        message: 'Client successfully updated',
        updatedClient
    });
});

// delete a client route controller definition
const deleteClient = catchAsync(async (req: Request, res: Response) => {
    const deletedClient = await userService.remove(req.params.id);

    res.status(200).send({
        message: 'Client successfully deleted'
    });
});

export {
    testCheck,
    getAllClients,
    createClient,
    getClientByID,
    updateClient,
    deleteClient
};

import { Request, Response, NextFunction, RequestHandler } from 'express';
import { register, login, listAll, forgetPassword, editPassword, remove } from '../services/authService';
import catchAsync from '../helpers/catchAsync';
import pick from '../helpers/pick';
import { registrationValidator } from 'policy/auth.policy';

// test route controller definition
const testCheck: RequestHandler = (req: Request, res: Response) => {
    res.status(200).send({
        message: 'Auth route testCheck'
    });
};

// get all clients with conditions route controller definition
const changePassword: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, ['sortBy']);
    const filter = pick(req.query, ['name', 'email', 'phone']);
    const clients: any = await listAll(options, filter);
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
// const getClientByID: RequestHandler = catchAsync(async (req: Request, res: Response) => {
//     const client = await listOne(req.params.id);

//     res.status(200).send({
//         status: 'success',
//         message: 'User successfully fetched',
//         data: {
//             client
//         }
//     });
// });

// add a client route controller definition
const registerUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const client = await register(req);

    res.status(201).send({
        message: 'User successfully created',
        client
    });
});

// update a client route controller definition
const loginUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const updatedClient = await login(req.params.id, req);

    res.status(200).send({
        message: 'User successfully logged in',
        updatedClient
    });
});

// delete a client route controller definition
const forgotPassword: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const deletedClient = await forgetPassword(req.body);

    res.status(200).send({
        message: 'Client successfully deleted'
    });
});

export { testCheck, changePassword, registerUser, loginUser, forgotPassword };

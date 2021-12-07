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

// get all clients with conditions route controller definition
// const changePassword: RequestHandler = catchAsync(async (req: Request, res: Response) => {
//     // const options = pick(req.query, ['sortBy']);
//     // const filter = pick(req.query, ['name', 'email', 'phone']);
//     const clients: any = await listAll(req.body);
//     const count = await clients.length;
//     res.status(200).send({
//         status: 'success',
//         message: 'Clients successfully fetched',
//         data: {
//             count,
//             clients
//         }
//     });
// });

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

// delete a client route controller definition
const forgotPassword: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const user: any = await forgetPassword(req, res);

    res.status(200).send({
        message: 'Client successfully deleted',
        user
    });
});

export { testCheck, changePassword, registerUser, loginUser, forgotPassword };

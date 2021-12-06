import { Request, Response, Router } from 'express';
import clientRoute from './clientRoute';
import providerRoute from './providerRoute';
import authRoute from './authRoute';
import userplanRoute from './userplanRoute';
import userRoute from './userRoute';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    res.status(200).send({
        message: 'API route connection testCheck'
    });
}); // test route

router.use('/clients', clientRoute); // use the client routes
router.use('/providers', providerRoute); // use the provider routes
router.use('/auth', authRoute); // use the auth routes
router.use('/user', userRoute); // use the user  routes
router.use('/userplan', userplanRoute); // use the user plan routes

export = router;

import express from 'express';
import clientRoute from './clientRoute';
import providerRoute from './providerRoute';
import authRoute from './authRoute';
import userplanRoute from './userplanRoute';

const router = express.Router();

router.use('/clients', clientRoute); // use the client routes
router.use('/providers', providerRoute); // use the provider routes
router.use('/auth', authRoute); // use the auth routes
router.use('/userplan', userplanRoute); // use the user plan routes

export = router;

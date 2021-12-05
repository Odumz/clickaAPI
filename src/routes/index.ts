import express from 'express';
import clientRoute from './clientRoute';
import providerRoute from './providerRoute';
import authRoute from './authRoute';

const router = express.Router();

router.use('/clients', clientRoute); // use the client routes
router.use('/providers', providerRoute); // use the provider routes
router.use('/auth', authRoute); // use the auth routes

export = router;

import { Router } from 'express';
import { testCheck, getAllClients, createClient, getClientByID, updateClient, deleteClient } from '../controllers/userController';
import clientValidation from '../policy/user.policy';
import validate from '../helpers/validate';

const router: Router = Router();

router.get('/ping', testCheck); // test route

router.get('/all', getAllClients); // get all clients with conditions

router.get('/:id', validate.validate(clientValidation.getUser), getClientByID); // get a client by ID

router.post('/add', validate.validate(clientValidation.addUser), createClient); // add a client to the database

router.put('/edit/:id', validate.validate(clientValidation.editUser), updateClient); // edit a client in the database

router.delete('/delete/:id', validate.validate(clientValidation.deleteUser), deleteClient); // delete a client in the database

export = router;

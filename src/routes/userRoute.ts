import { Router } from 'express';
import { testCheck, getAllClients, getClientByID, updateClient, deleteClient } from '../controllers/userController';
import clientValidation from '../policy/user.policy';
import { validate } from '../helpers/validate';

const router: Router = Router();

router.get('/ping', testCheck); // test route

router.get('/all', getAllClients); // get all clients with conditions

router.get('/:id', validate(clientValidation.getUser), getClientByID); // get a client by ID

// router.post('/add', validate(clientValidation.addUser), createClient); // add a client to the database

router.put('/edit/:id', validate(clientValidation.editUser), updateClient); // edit a client in the database

router.delete('/delete/:id/profile-image', validate(clientValidation.deleteUser), deleteClient); // delete a user's profile image in the database

export = router;

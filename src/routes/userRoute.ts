import { Router } from 'express';
import { testCheck, getAllUsers, getUserByID, updateUser, deleteUser } from '../controllers/userController';
import clientValidation from '../policy/user.policy';
import { validate } from '../helpers/validate';

const router: Router = Router();

router.get('/ping', testCheck); // test route

router.get('/all', getAllUsers); // get all clients with conditions

router.get('/:id', validate(clientValidation.getUser), getUserByID); // get a client by ID

// router.post('/add', validate(clientValidation.addUser), createUser); // add a client to the database

router.put('/edit/:id', validate(clientValidation.editUser), updateUser); // edit a client in the database

router.delete('/delete/:id/profile-image', validate(clientValidation.deleteUser), deleteUser); // delete a user's profile image in the database

export = router;

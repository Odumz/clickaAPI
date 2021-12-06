import express from 'express';
import { testCheck, createUserPlan, getAllUserPlans, getUserPlanByID, updateUserPlan, deleteUserPlan } from '../controllers/userplanController';
import userplanValidation from '../policy/userplan.policy';
import { validate } from '../helpers/validate';

const router = express.Router();

router.get('/ping', testCheck); // test route

router.get('/all', getAllUserPlans); // get all userplans with conditions

router.get('/:id', validate(userplanValidation.getUserPlan), getUserPlanByID); // get one userplan by ID

router.post('/add', validate(userplanValidation.addUserPlan), createUserPlan); // add a userplan to the database

router.put('/edit/:id', validate(userplanValidation.editUserPlan), updateUserPlan); // edit a userplan in the database

router.delete('/delete/:id', validate(userplanValidation.deleteUserPlan), deleteUserPlan); // delete a userplan from the userplans

export = router;

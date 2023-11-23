import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

//will call controller function
router.post('/', userController.createUser) // create a new user
router.get('/', userController.getAllUsers) // get all users
router.get('/:userId', userController.getSingleUser) // get single user by id
router.put('/:userId', userController.updateUser) // update user by id
router.delete('/:userId', userController.deleteUser) // delete user by id

export const UserRoutes = router;
import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/', userController.createUser) // create a new user
router.get('/', userController.getAllUsers) // get all users
router.get('/:userId', userController.getSingleUser) // get single user by id
router.put('/:userId', userController.updateUser) // update user by id
router.delete('/:userId', userController.deleteUser) // delete user by id
router.put('/:userId/orders', userController.addOrderToUser) // add order to specific user
router.get('/:userId/orders', userController.getAllOrdersOfUser) // get all orders from a specific user
// router.get('/:userId/orders/total-price', userController.getTotalPriceOfOrders) // get total price of orders

export const UserRoutes = router;
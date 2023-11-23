import { Request, Response } from 'express'
import { UserServices } from './user.service'

// Create a new user into the database
const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;

    const data = await UserServices.createUserIntoDB(user)
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: data,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 500,
        description: "Failed to Create User!"
      },
    })
  }
}

// Get all users from the database
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await UserServices.getAllUsersFromDB()
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: data,
    })
  } catch (error) {
    res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: {
          code: 500,
          description: "Failed to Fetch User!"
        },
      })
  }
}

// Get single user from the database
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const {userId} = req.params;
    const data = await UserServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Student is fetched successfully',
      data: data,
    })
  } catch (error) {
    res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: {
          code: 500,
          description: "Failed to Fetch User!"
        },
      })
  }
}

// Update single user from the database
const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { user } = req.body;
        const data = await UserServices.updateUserIntoDB(userId, user)
        res.status(200).json({
          success: true,
          message: 'User updated successfully!',
          data: data,
        })
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: 'Something went wrong',
          error: {
            code: 500,
            description: "Failed to Update User!"
          },
        })
      }
}

// Delete user from the database
const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        await UserServices.deleteUserFromDB(userId)
            res.status(200).json({
                success: true,
                message: 'User deleted successfully!',
                data: null,
              })
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Something went wrong',
          error: {
            code: 500,
            description: "Failed to Delete User!"
          },
        })
      }
}

// Add order to user
const addOrderToUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { orders } = req.body;
        await UserServices.addOrderToUserIntoDB(userId, orders)
        res.status(200).json({
          success: true,
          message: 'Order created successfully!',
          data: null,
        })
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: 'Something went wrong',
          error: {
            code: 500,
            description: "Failed to Add Order!"
          },
        })
      }
}

// Show all order of a user
const getAllOrdersOfUser = async (req: Request, res: Response) => {
    const {userId} = req.params;
    try {
        const data = await UserServices.getAllOrdersOfUserFromDB(userId)
        
        res.status(200).json({
          success: true,
          message: 'Orders fetched successfully!',
          data: data,
        })
      } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: {
              code: 500,
              description: "Failed to Fetch Orders!"
            },
          })
      }
}

// Show all order of a user
const getTotalPriceOfOrders = async (req: Request, res: Response) => {
    const {userId} = req.params;
    try {
        const data = await UserServices.getTotalPriceOfOrdersFromDB(userId)
        
        res.status(200).json({
          success: true,
          message: 'Total price calculated successfully!',
          data: data,
        })
      } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: {
              code: 500,
              description: "Failed to Calculate Total Price of Orders!"
            },
          })
      }
}

export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    addOrderToUser,
    getAllOrdersOfUser,
    getTotalPriceOfOrders
}

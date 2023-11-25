import { Request, Response } from 'express'
import { UserServices } from './user.service'
import {
  UserCreateValidationSchema,
  UserUpdateValidationSchema,
} from './user.validate'

// Create a new user into the database
const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body

    const { error, value } = UserCreateValidationSchema.validate(user)

    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: {
          code: 500,
          description: error.message,
        },
      })
    }

    const result = await UserServices.createUserIntoDB(value)

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 500,
        description: 'Failed to Create User!',
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
        description: 'Failed to Fetch User!',
      },
    })
  }
}

// Get single user from the database
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const data = await UserServices.getSingleUserFromDB(userId)

    if (data !== null) {
      res.status(200).json({
        success: true,
        message: 'User is fetched successfully',
        data: data,
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 500,
        description: 'Failed to Fetch User!',
      },
    })
  }
}

// Update single user from the database
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const { user } = req.body

    const { error, value } = UserUpdateValidationSchema.validate(user)

    const data = await UserServices.updateUserIntoDB(userId, value)

    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: {
          code: 500,
          description: error.message,
        },
      })
    }

    if (data !== null) {
      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: data,
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 500,
        description: 'Failed to Update User!',
        error: error,
      },
    })
  }
}

// Delete user from the database
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const data = await UserServices.deleteUserFromDB(userId)

    if (data !== null) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 500,
        description: 'Failed to Delete User!',
      },
    })
  }
}

// Add order to user
const addOrderToUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const { orders } = req.body
    const data = await UserServices.addOrderToUserIntoDB(userId, orders)

    if (data !== null) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 500,
        description: 'Failed to Add Order!',
      },
    })
  }
}

// Show all order of a user
const getAllOrdersOfUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const data = await UserServices.getAllOrdersOfUserFromDB(userId)

    if (data !== null) {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: data,
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 500,
        description: 'Failed to Fetch Orders!',
      },
    })
  }
}

// Show all order of a user
// const getTotalPriceOfOrders = async (req: Request, res: Response) => {
//   const { userId } = req.params
//   try {
//     const totalPrice = await UserServices.getTotalPriceOfOrdersFromDB(userId)

//     res.status(200).json({
//       success: true,
//       message: 'Total price calculated successfully!',
//       data: {
//         totalPrice: totalPrice.toFixed(2),
//       },
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Something went wrong',
//       error: {
//         code: 500,
//         description: 'Failed to Calculate Total Price of Orders!',
//       },
//     })
//   }
// }

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrderToUser,
  getAllOrdersOfUser,
  // getTotalPriceOfOrders,
}

import bcrypt from 'bcryptjs'
import { User, UserWithoutPassword } from './user.interface'
import { UserModel } from './user.model'

// This function checks if the user exists in the database or not
async function userExists(id: string) {
  const userCount = await UserModel.countDocuments({ userId: { $eq: id } })
  return userCount > 0
}

// service to create new user into database
const createUserIntoDB = async (user: User): Promise<UserWithoutPassword> => {
  const {
    userId,
    username,
    password,
    fullName,
    age,
    email,
    isActive,
    hobbies,
    address,
    orders,
  } = user

  const hashedPassword = await bcrypt.hash(password, 10) // hashing password

  const newUser = new UserModel({
    userId,
    username,
    password: hashedPassword, // store the hashed password
    fullName,
    age,
    email,
    isActive,
    hobbies,
    address,
    orders,
  })

  await newUser.save()

  const {
    password: omitPassword,
    _id,
    orders: omitOrders,
    ...userWithoutPassword
  } = newUser.toObject() // Omit password and orders object

  return userWithoutPassword as UserWithoutPassword
}

// service to get all users from database
const getAllUsersFromDB = async (): Promise<User[]> => {
  const result = await UserModel.find(
    {},
    {
      _id: 0,
      userId: 0,
      password: 0,
      'fullName._id': 0,
      'address._id': 0,
      orders: 0,
      __v: 0,
    },
  )
  return result
}

// service to get single user from database by id
const getSingleUserFromDB = async (id: string): Promise<User | null> => {
  if (!(await userExists(id))) {
    // validating if the user exists or not
    return null
  } else {
    const result = await UserModel.findOne(
      { userId: { $eq: id } },
      {
        _id: 0,
        password: 0,
        'fullName._id': 0,
        'address._id': 0,
        orders: 0,
        __v: 0,
      },
    )
    return result
  }
}

// service used to update an existing user info to database
const updateUserIntoDB = async (
  id: string,
  user: User,
): Promise<User | null> => {
  if (!(await userExists(id))) {
    // validating if the user exists or not
    return null
  } else {
    const result = await UserModel.findOneAndUpdate(
      { userId: { $eq: id } },
      user,
      {
        projection: {
          _id: 0,
          password: 0,
          'fullName._id': 0,
          'address._id': 0,
          orders: 0,
          __v: 0,
        },
      },
    )
    return result
  }
}

// service to delete an existing user from database
const deleteUserFromDB = async (id: string): Promise<User | null> => {
  if (!(await userExists(id))) {
    // validating if the user exists or not
    return null
  } else {
    const result = await UserModel.findOneAndDelete({ userId: { $eq: id } })
    return result
  }
}

// service to add order to a specific user by id
const addOrderToUserIntoDB = async (
  id: string,
  order: User[],
): Promise<User | null> => {
  if (!(await userExists(id))) {
    // validating if the user exists or not
    return null
  } else {
    const result = UserModel.findOneAndUpdate(
      { userId: id },
      { $push: { orders: order } },
      { new: true },
    )
    return result
  }
}

// service to get all orders from a specific user by id
const getAllOrdersOfUserFromDB = async (id: string): Promise<User[] | null> => {
  if (!(await userExists(id))) {
    // validating if the user exists or not
    return null
  } else {
    const result = await UserModel.find(
      { userId: { $eq: id } },
      { _id: 0, orders: 1 },
    )
    return result
  }
}

// service to get total order price from specific user by id
// const getTotalPriceOfOrdersFromDB = async (id: string) => {
//   // Will do at last
// }

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  addOrderToUserIntoDB,
  getAllOrdersOfUserFromDB,
  // getTotalPriceOfOrdersFromDB,
}

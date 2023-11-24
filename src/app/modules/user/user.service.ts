import bcrypt from 'bcryptjs'
import { User, UserWithoutPassword } from './user.interface'
import { UserModel } from './user.model'

async function userExists(id: string) {
  const userCount = await UserModel.countDocuments({ userId: { $eq: id } })
  return userCount > 0
}

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

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = new UserModel({
    userId,
    username,
    password: hashedPassword,
    fullName,
    age,
    email,
    isActive,
    hobbies,
    address,
    orders,
  })

  await newUser.save()
  // return newUser

  const { password: omitPassword, _id, orders: omitOrders, ...userWithoutPassword } = newUser.toObject();

  return userWithoutPassword as UserWithoutPassword;
}

const getAllUsersFromDB = async (): Promise<User[]> => {
  const result = await UserModel.find({}, { _id: 0, userId: 0, password: 0, "fullName._id": 0, "address._id": 0, orders: 0, __v: 0 })
  return result
}

const getSingleUserFromDB = async (id: string): Promise<User | null> => {
  if (!(await userExists(id))) {
    return null
  } else {
    const result = await UserModel.findOne(
      { userId: { $eq: id } },
      { _id: 0, password: 0, "fullName._id": 0, "address._id": 0, orders: 0, __v: 0 },
    )
    return result
  }
}

const updateUserIntoDB = async (
  id: string,
  user: User,
) => {
  if (!(await userExists(id))) {
    return null
  } else {
    const result = await UserModel.findOneAndUpdate(
      { userId: { $eq: id } }, user,
      {projection: { "_id": 0, "password": 0, "fullName._id": 0, "address._id": 0, "orders": 0, "__v": 0 }},
    )
    return result
  }
}

const deleteUserFromDB = async (id: string): Promise<User | null> => {
  if (!(await userExists(id))) {
    return null
  } else {
    const result = await UserModel.findOneAndDelete({ userId: { $eq: id } })
    return result
  }
}

const addOrderToUserIntoDB = async (
  id: string,
  order: User[],
): Promise<User | null> => {
  if (!(await userExists(id))) {
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

const getAllOrdersOfUserFromDB = async (id: string): Promise<User[] | null> => {
  if (!(await userExists(id))) {
    return null
  } else {
    const result = await UserModel.find({ userId: { $eq: id } }, { _id: 0, orders: 1 })
    return result
  }
}

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

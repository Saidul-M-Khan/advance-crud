import bcrypt from 'bcryptjs'
import { User } from './user.interface'
import { UserModel } from './user.model'

const createUserIntoDB = async (user: User): Promise<User> => {
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
  return newUser
}

const getAllUsersFromDB = async (): Promise<User[]> => {
  const result = await UserModel.find({}, { userId: 0, orders:0 })
  return result
}

const getSingleUserFromDB = async (id: string): Promise<User | null> => {
  const result = await UserModel.findOne({ userId: { $eq: id } }, {orders: 0})
  return result
}

const updateUserIntoDB = async (
  id: string,
  user: User,
): Promise<User | null> => {
  const result = await UserModel.findOneAndUpdate(
    { userId: { $eq: id } },
    { $set: user },
    {orders: 0}
  )
  return result
}

const deleteUserFromDB = async (id: string): Promise<User | null> => {
  const result = await UserModel.findOneAndDelete({ userId: { $eq: id } })
  return result
}

const addOrderToUserIntoDB = async (
  id: string,
  user: User[],
): Promise<User | null> => {
  const result = await UserModel.aggregate([
    {
      $match: { userId: { $eq: id } }
    },
    { $group: {_id: "$user"} },
  ])

  return result
}

const getAllOrdersOfUserFromDB = async (id: string): Promise<User[]> => {
  const result = await UserModel.find(
    { userId: { $eq: id } },
    {orders: 1}
  )
  return result
}

const getTotalPriceOfOrdersFromDB = async (id: string) => {
  // Will code later
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  addOrderToUserIntoDB,
  getAllOrdersOfUserFromDB,
  getTotalPriceOfOrdersFromDB,
}

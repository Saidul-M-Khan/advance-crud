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
  
  const userWithoutPassword = newUser.toJSON();
  delete userWithoutPassword.password;

  return userWithoutPassword;
}

const getAllUsersFromDB = async (): Promise<User[]> => {
  const result = await UserModel.find(
    {},
    {
      _id: 0,
      userId: 0,
      isActive: 0,
      'fullName._id': 0,
      hobbies: 0,
      password: 0,
      'address._id': 0,
      orders: 0,
    },
  )
  return result
}

const getSingleUserFromDB = async (id: string): Promise<User | null> => {
  const result = await UserModel.findOne(
    { userId: { $eq: id } },
    { _id: 0, password: 0, orders: 0 },
  )
  return result
}

// const updateUserIntoDB = async (
//   id: string,
//   user: User,
// ): Promise<User | null> => {
//   const result = await UserModel.findByIdAndUpdate(
//     { userId: { $eq: id } },
//     { password: 0 },
//     user,
//   )
//   return result
// }

const updateUserIntoDB = async (
    id: string,
    user: User,
  ): Promise<User | null> => {
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
    } = user;
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const updatedUser = new UserModel({
      userId,
      username,
      password: hashedPassword,
      fullName,
      age,
      email,
      isActive,
      hobbies,
      address,
    });
  
    const result = await UserModel.findByIdAndUpdate(
      { userId: { $eq: id } },
      updatedUser,
      { select: { password: 0 } },
    );
  
    return result;
  };

const deleteUserFromDB = async (id: string): Promise<User | null> => {
  const result = await UserModel.findOneAndDelete({ userId: { $eq: id } })
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
}

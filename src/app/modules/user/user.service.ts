import { User } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (user: User): Promise<User> => {
    const result = await UserModel.create(user);
    return result;
}

const getAllUsersFromDB = async (): Promise<User[]> => {
    const result = await UserModel.find({}, {_id:0, userId:0, isActive:0, "fullName._id":0, hobbies:0, password: 0, "address._id":0, orders:0});
    return result;
}

const getSingleUserFromDB = async (id: string): Promise<User | null> => {
    const result = await UserModel.findOne({userId: {$eq: id}}, {_id:0, password: 0, orders:0});
    return result;
}

const updateUserIntoDB = async (id: string, user: User): Promise<User | null> => {
    const result = await UserModel.findOneAndUpdate({userId: {$eq: id}}, {password: 0}, user);
    return result;
}

const deleteUserFromDB = async (id: string): Promise<User | null> => {
    const result = await UserModel.findOneAndDelete({userId: {$eq: id}});
    return result;
}

export const UserServices = { createUserIntoDB, getAllUsersFromDB, getSingleUserFromDB, updateUserIntoDB, deleteUserFromDB }
import { Schema, model } from 'mongoose'
import { Address, FullName, Orders, User } from './user.interface'

const FullNameSchema = new Schema<FullName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, "First name can't be more than 20 character"],
  },
  lastName: {
    type: String,
    required: true,
  },
})

const AddressSchema = new Schema<Address>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
})

const OrdersSchema = new Schema<Orders>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
})

const UserSchema = new Schema<User>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: FullNameSchema,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  address: {
    type: AddressSchema,
    required: true,
  },
  orders: {
    type: [OrdersSchema],
  },
})

export const UserModel = model<User>('User', UserSchema)

// virtual
// studentSchema.virtual('fullName').get(function () {
//   return this.name.firstName + this.name.middleName + this.name.lastName;
// });
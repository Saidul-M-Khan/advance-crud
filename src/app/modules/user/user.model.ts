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

// FullNameSchema.options.toJSON = {
//   transform: function (doc, ret, options) {
//     delete ret._id;
//   },
// };

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

// AddressSchema.options.toJSON = {
//   transform: function (doc, ret, options) {
//     delete ret._id;
//   },
// };

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

// OrdersSchema.options.toJSON = {
//   transform: function (doc, ret, options) {
//     delete ret._id;
//   },
// };

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
  }
})

// UserSchema.options.toJSON = {
//   transform: function (doc, ret, options) {
//     delete ret.password;
//     // delete ret.orders;
//     delete ret._id;
//     delete ret.__v;
//   },
// };



export const UserModel = model<User>('User', UserSchema)

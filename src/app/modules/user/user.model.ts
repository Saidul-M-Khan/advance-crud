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


// virtual
// UserSchema.virtual('totalOrderCost').get(function() {
//   if (this.orders && this.orders.length > 0) {
//     return this.orders.reduce((totalCost, order) => totalCost + order.price * order.quantity, 0);
//   } else {
//     return null;
//   }
// })

export const UserModel = model<User>('User', UserSchema)

import Joi from 'joi'

// Define Joi schema for FullName (create)
const FullNameCreateValidationSchema = Joi.object({
  firstName: Joi.string().required().trim().max(20).messages({
    'string.base': 'First name must be a string',
    'string.empty': 'First name is required',
    'string.max': 'First name cannot be more than 20 characters',
  }),
  lastName: Joi.string().required().trim().max(20).messages({
    'string.base': 'Last name must be a string',
    'string.empty': 'Last name is required',
    'string.max': 'Last name cannot be more than 20 characters',
  }),
})

// Define Joi schema for FullName (update)
const FullNameUpdateValidationSchema = Joi.object({
  firstName: Joi.string().trim().max(20).messages({
    'string.base': 'First name must be a string',
    'string.max': 'First name cannot be more than 20 characters',
  }),
  lastName: Joi.string().trim().max(20).messages({
    'string.base': 'Last name must be a string',
    'string.max': 'Last name cannot be more than 20 characters',
  }),
})

// Define Joi schema for Address (create)
const AddressCreateValidationSchema = Joi.object({
  street: Joi.string().required().messages({
    'string.base': 'Street name must be a string',
    'string.empty': 'Street name is required',
  }),
  city: Joi.string().required().messages({
    'string.base': 'City name must be a string',
    'string.empty': 'City name is required',
  }),
  country: Joi.string().required().messages({
    'string.base': 'Country name must be a string',
    'string.empty': 'Country name is required',
  }),
})

// Define Joi schema for Address (update)
const AddressUpdateValidationSchema = Joi.object({
  street: Joi.string().messages({
    'string.base': 'Street name must be a string',
  }),
  city: Joi.string().messages({
    'string.base': 'City name must be a string',
  }),
  country: Joi.string().messages({
    'string.base': 'Country name must be a string',
  }),
})

// Define Joi schema for Orders (create)
const OrdersCreateValidationSchema = Joi.object({
  productName: Joi.string().required().messages({
    'string.base': 'Product name must be a string',
    'string.empty': 'Product name is required',
  }),
  price: Joi.number().required().messages({
    'string.base': 'Price must be a number',
    'string.empty': 'Price is required',
  }),
  quantity: Joi.number().required().messages({
    'string.base': 'Quantity must be a number',
    'string.empty': 'Quantity is required',
  }),
})

// Define Joi schema for Orders (update)
const OrdersUpdateValidationSchema = Joi.object({
  productName: Joi.string().messages({
    'string.base': 'Product name must be a string',
  }),
  price: Joi.number().messages({
    'string.base': 'Price must be a number',
  }),
  quantity: Joi.number().messages({
    'string.base': 'Quantity must be a number',
  }),
})

// Define Joi schema for User (create)
const UserCreateValidationSchema = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullName: FullNameCreateValidationSchema.required(),
  age: Joi.number().required(),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be in a valid format',
    'any.required': 'Email is required',
  }),
  isActive: Joi.boolean().required(),
  hobbies: Joi.array().items(Joi.string()).required(),
  address: AddressCreateValidationSchema.required(),
  orders: Joi.array().items(OrdersCreateValidationSchema),
})

// Define Joi schema for User (update)
const UserUpdateValidationSchema = Joi.object({
  userId: Joi.number(),
  username: Joi.string(),
  password: Joi.string(),
  fullName: FullNameUpdateValidationSchema,
  age: Joi.number(),
  email: Joi.string().email().messages({
    'string.email': 'Email must be in a valid format',
    'any.required': 'Email is required',
  }),
  isActive: Joi.boolean(),
  hobbies: Joi.array().items(Joi.string()),
  address: AddressUpdateValidationSchema,
  orders: Joi.array().items(OrdersUpdateValidationSchema),
})

export { UserCreateValidationSchema, UserUpdateValidationSchema }
